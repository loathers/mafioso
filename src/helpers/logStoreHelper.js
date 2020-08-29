import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX from 'constants/REGEXES';

import Entry from 'classes/Entry';

import logStore from 'store/logStore';

import download, {createBlob} from 'utilities/download';

/**
 * look at each entry and their neighbor in front and see if
 *  they are valid to combine together
 *
 * @param {Array<Entry>} entriesList
 * @returns {Array<Entry>}
 */
export function combineEntries(entriesList) {
  let combinedEntriesList = [];

  const searchEntries = entriesList.slice();
  const originalLength = entriesList.length;

  // going to look at all the entries,
  while (searchEntries.length > 0) {
    const currEntry = searchEntries.shift();

    // if this is the last entry, we are done
    if (searchEntries.length <= 0) {
      combinedEntriesList.push(currEntry);
      continue;
    }

    // get the next entry and see if it can combine
    const nextEntry = searchEntries.shift();
    if (currEntry.canCombineWith(nextEntry)) {
      const combinedEntry = new Entry({
        entryId: currEntry.id,
        entryIdx: currEntry.entryIdx,
        rawText: currEntry.rawText.concat('\n\n').concat(nextEntry.rawText),
      });

      // put the newly created entry back to the front of the search
      // just in case it can combine with the next one
      searchEntries.unshift(combinedEntry);
      continue;
    }

    // did not combine, move on
    searchEntries.unshift(nextEntry); // put the next entry back
    combinedEntriesList.push(currEntry);
  }

  console.log(`%cCombined entries from ${originalLength} to ${combinedEntriesList.length}`, 'color: #6464ff');
  return combinedEntriesList;
}
/**
 * there are some things we're going to guess about an entry
 *  - what day it is on
 *  - turn num, and adjusted if needed
 *  - what familiar was used
 *
 * @param {Array<Entry>} allEntries
 * @returns {Array<Entry>}
 */
export function createEstimatedEntries(allEntries) {
  if (!logStore.isAscensionLog) {
    return allEntries;
  }

  // all data that is being tracked
  const estimates = {
    dateList: [], // kol dates
    prevEntry: null,
    prevTurnNum: -1,
    trackedFamiliar: null, // familiar that user last swapped to
  }

  // start
  const conjecturedEntries = allEntries.map((entry, idx) => {
    // find the next entry that is not a free adventure
    const nextEntry = logStore.findNextEntry(idx, {isAdventure: true, isFreeCombat: false});

    // update turnNum
    entry = handleEstimateTurnNum(entry, nextEntry);

    // + use entries with the date in them as a point of reference
    const dateMatch = entry.findMatcher(REGEX.SNAPSHOT.KOL_DATE);
    if (dateMatch !== undefined && !estimates.dateList.includes(dateMatch)) {
      estimates.dateList.push(dateMatch);
    }

    // set dayNum of entry
    entry.dayNum = estimates.dateList.length;

    // + update estimate if familar was swapped to
    if (entry.entryType === ENTRY_TYPE.FAMILIAR) {
      estimates.trackedFamiliar = entry.findMatcher(REGEX.FAMILIAR.SWITCH_TO_RESULT);
    }

    // apply trackedFamiliar only if it is a combat
    if (entry.isCombatEncounter) {
      entry.familiarUsed = estimates.trackedFamiliar;
    }

    // pill keeper
    entry = handleEstimatePillKeeper(entry, idx);

    // update estimates
    estimates.prevEntry = entry;
    estimates.prevTurnNum = entry.turnNum;

    return entry;
  });

  // done
  logStore.ascensionAttributes.dateList = estimates.dateList || [];
  return conjecturedEntries;
}
/**
 * double check what mafia thinks this turn number is
 *
 * @param {Entry} currEntry
 * @param {Entry} nextEntry
 * @returns {Entry}
 */
function handleEstimateTurnNum(currEntry, nextEntry) {
  const nextTurnNum = nextEntry && nextEntry.rawTurnNum;
  const myTurnNum = currEntry.turnNum;

  // rawTurnNum means that mafia marked it as an adventure
  if (currEntry.hasRawTurnNum) {
    // if the next number is the same as current number, most likely this is a free adv (thanks CaptainScotch!)
    if (nextTurnNum === myTurnNum) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = nextTurnNum - 1;
    }

    // freeing the king doesn't actually take a turn
    if (currEntry.entryType === ENTRY_TYPE.QUEST.ASCENSION_END) {
      currEntry.isInBetweenTurns = true;
      currEntry.turnNum = myTurnNum - 1;
    }

  // I don't have a number, so we'll assume this is before the next adventure
  } else {
    if (nextTurnNum) {
      currEntry.turnNum = nextTurnNum - 1;
    } else {
      currEntry.turnNum = 0;
    }
  }

  return currEntry;
}
/**
 * find data for Pill Keeper uses
 *
 * @param {Entry} currEntry
 * @param {Number} idx
 * @returns {Entry}
 */
function handleEstimatePillKeeper(currEntry, idx) {
  if (currEntry.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER) {
    // see if we can get the noncombat that this sneakisol went to
    if (currEntry.hasText(REGEX.PILL_KEEPER.SNEAKISOL)) {
      const sneakisolNonCombat = logStore.findNextEntry(idx, {isNonCombatEncounter: true});
      if (sneakisolNonCombat) {
        currEntry.additionalDisplay = `(${sneakisolNonCombat.encounterDisplay})`;
      }
    }

    // same for Sunday surprise semiare
    if (currEntry.hasText(REGEX.PILL_KEEPER.SURPRISE)) {
      const surpriseEncounter = logStore.findNextEntry(idx, {isSemirare: true});
      if (surpriseEncounter) {
        currEntry.additionalDisplay = `(${surpriseEncounter.encounterDisplay})`;
      }
    }
  }

  return currEntry;
}
// -- utility
/**
 * downloads the current ascension log to user
 */
export function downloadFullLog() {
  if (!logStore.isReady) return;

  // if not an ascension log, download with generic name
  if (!logStore.isAscensionLog) {
    download(logStore.export(), 'mafioso_log', 'text/plain');
    return;
  }

  const fileName = `${logStore.characterName}#${logStore.ascensionNum}-${logStore.pathLabel}`;
  download(logStore.export(), fileName, 'text/plain');
}
/**
 * @returns {Blob}
 */
export function createLogFile() {
  if (!logStore.isAscensionLog || logStore.logHash === undefined) return;

  const preambleData =
    `NAME=${logStore.characterName}\n` +
    `DIFFICULTY=${logStore.difficultyName}\n` +
    `PATH=${logStore.pathName}\n` +
    `DAYS=${logStore.dayCount}\n` +
    `TURNS=${logStore.turnCount}\n` +
    `HASH=${logStore.logHash}`
  ;
  return createBlob(`${preambleData}\n${logStore.export()}`, 'text/plain');
}
