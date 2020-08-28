import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import REGEX from 'constants/REGEXES';

import Entry from 'classes/Entry';

import logStore from 'store/logStore';

import download, {createBlob} from 'utilities/download';

/**
 * currently the parameter passed isn't a shallow copy
 *  but it might be something to consider
 *
 * @param {Array<Entry>} entriesList
 * @returns {Array<Entry>}
 */
export function condenseEntries(entriesList) {
  const originalLength = entriesList.length;
  let condensedData = [];

  while (entriesList.length > 0) {
    const currEntry = entriesList.shift();
    if (entriesList.length <= 0) {
      condensedData.push(currEntry);
      continue;
    }

    const nextEntry = entriesList.shift();
    if (currEntry.canCombineWith(nextEntry)) {
      const combinedEntry = new Entry({
        entryId: currEntry.id,
        entryIdx: currEntry.entryIdx,
        rawText: currEntry.rawText.concat('\n\n').concat(nextEntry.rawText),
      });

      entriesList.unshift(combinedEntry);
      continue;
    }

    entriesList.unshift(nextEntry);
    condensedData.push(currEntry);
  }

  console.log(`%cCondensed entries from ${originalLength} to ${condensedData.length}`, 'color: #6464ff');
  return condensedData;
}
/**
 * there are some things we're going to guess about an entry
 *  - what day it is on
 *  - turn num, and adjusted if needed
 *
 * @param {Array<Entry>} allEntries
 * @returns {Array<Entry>}
 */
export function createConjectureData(allEntries) {
  if (!logStore.isAscensionLog) {
    return allEntries;
  }

  // keeps track of kol dates this run took
  const dateListEstimate = [];

  // track what familiar user last swapped to
  let trackedFamiliar = null;

  const conjecturedEntries = allEntries.map((entry, idx) => {
    // const prevEntry = idx > 1 ? allEntries[idx - 1] : undefined;
    // const prevTurnNum = prevEntry && prevEntry.turnNum;

    // find the next entry that is not a free adventure
    const nextEntry = logStore.findNextEntry(idx, {hasRawTurnNum: true, isFreeCombat: false});
    const nextTurnNum = nextEntry && nextEntry.rawTurnNum;

    const myTurnNum = entry.turnNum;

    // double check what mafia thinks this turn number is
    if (entry.hasRawTurnNum) {
      // if the next number is the same as current number, most likely this is a free adv (thanks CaptainScotch!)
      if (nextTurnNum === myTurnNum) {
        entry.attributes.isInBetweenTurns = true;
        entry.turnNum = nextTurnNum - 1;
      }

      // freeing the king doesn't actually take a turn
      if (entry.entryType === ENTRY_TYPE.QUEST.ASCENSION_END) {
        entry.attributes.isInBetweenTurns = true;
        entry.turnNum = myTurnNum - 1;
      }

    // I don't have a number, so we'll assume this is before the next adventure
    } else {
      if (nextTurnNum) {
        entry.turnNum = nextTurnNum - 1;
      } else {
        entry.turnNum = 0;
      }
    }

    // use entries with the date in them as a possible point of a new day
    // if (entry.entryType === ENTRY_TYPE.SNAPSHOT.DAY_INFO || entry.entryType === ENTRY_TYPE.SNAPSHOT.CHARACTER_INFO) {
    const dateMatch = entry.findMatcher(REGEX.SNAPSHOT.KOL_DATE);
    if (dateMatch && !dateListEstimate.includes(dateMatch)) {
      dateListEstimate.push(dateMatch);
    }
    // }

    // set this dayNum
    entry.attributes.dayNum = dateListEstimate.length;

    // lets see if we can get the noncombat that this sneakisol went to
    if (entry.entryType === ENTRY_TYPE.IOTM.PILL_KEEPER) {
      if (entry.hasText(REGEX.PILL_KEEPER.SNEAKISOL)) {
        const sneakisolNonCombat = logStore.findNextEntry(idx, {isNonCombatEncounter: true});
        if (sneakisolNonCombat) {
          entry.attributes.additionalDisplay = `(${sneakisolNonCombat.encounterDisplay})`;
        }
      }

      if (entry.hasText(REGEX.PILL_KEEPER.SURPRISE)) {
        const surpriseEncounter = logStore.findNextEntry(idx, {isSemirare: true});
        if (surpriseEncounter) {
          entry.attributes.additionalDisplay = `(${surpriseEncounter.encounterDisplay})`;
        }
      }
    }

    // -- see what familiar player is using
    if (entry.entryType === ENTRY_TYPE.FAMILIAR) {
      trackedFamiliar = entry.findMatcher(REGEX.FAMILIAR.SWITCH_TO_RESULT);
    }

    if (entry.isCombatEncounter) {
      entry.attributes.familiarUsed = trackedFamiliar;
    }

    // completed create conjecture data for entry
    return entry;
  });

  // done
  logStore.ascensionAttributes.dateList = dateListEstimate || [];
  return conjecturedEntries;
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
  return createBlob(logStore.export(), 'text/plain');
}
