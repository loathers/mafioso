import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {REGEX} from 'constants/REGEXES';

import logStore from 'store/LogStore';

async function createTestStore(text) {
  logStore.reset();
  await logStore.prepareLog(text);
  await logStore.parse();
  return logStore;
};

/**
 * doesn't work because the logStore global is different in the test runner than the one that `logStoreHelper.js` uses
 */
test.skip('forced_parsing: Sneakisol: should properly look for a non-combat encounter to mark as forced', async () => {
  const sampleText = "equip acc2 Eight Days a Week Pill Keeper\n"
    + "\n"
    + "Took choice 1395/3: Wednesday - Sneakisol\n"
    + "\n"
    + "cast 1 Eye and a Twist\n"
    + "You acquire an item: Eye and a Twist\n"
    + "\n"
    + "[9] Your Mushroom Garden\n"
    + "Encounter: piranha plant\n"
    + "Round 0: Captain Scotch wins initiative!\n"
    + "Round 1: Captain Scotch casts SAUCESTORM!\n"
    + "Round 2: piranha plant takes 111 damage.\n"
    + "Round 2: piranha plant takes 111 damage.\n"
    + "Round 2: Captain Scotch wins the fight!\n"
    + "After Battle: Underground Bluebell peeks out of the shadows, checks for danger, and sidles up to you with some meat.\n"
    + "You gain 10 Meat.\n"
    + "After Battle: You gain 25 Strengthliness\n"
    + "You gain a Muscle point!\n"
    + "After Battle: You gain 68 Magicalness\n"
    + "You gain a Mysticality point!\n"
    + "After Battle: You gain 18 Smarm\n"
    + "You gain a Moxie point!\n"
    + "After Battle: \"Hey, you bought a broken sword!\" Greedy McGhost says. \"Doesn't that feel good?\"\n"
    + "After Battle: You gain 132 Fortitude\n"
    + "After Battle: You gain 162 Magicalness\n"
    + "After Battle: You gain 144 Cheek\n"
    + "You gain 6 Soulsauce\n"
    + "This combat did not cost a turn\n"
    + "\n"
    + "[9] Mix 1 bottle of rum + 1 lime\n"
    + "You acquire an item: grog\n"
    + "\n"
    + "drink 1 grog\n"
    + "You gain 13 Adventures\n"
    + "You gain 10 Fortitude\n"
    + "You gain a Muscle point!\n"
    + "You gain 3 Drunkenness\n"
    + "\n"
    + "cast 1 Lock Picking\n"
    + "Encounter: Lock Picking\n"
    + "Took choice 1414/2: Pick Jarlsberg's Lock\n"
    + "choice.php?pwd&whichchoice=1414&option=2\n"
    + "You acquire an item: Jarlsberg's key\n"
    + "\n"
    + "eat 1 magical sausage\n"
    + "You gain 1 Adventure\n"
    + "You gain 999 Mana Points\n"
    + "\n"
    + "cast 1 Calculate the Universe\n"
    + "[9] numberology 98\n"
    + "You gain 76 Magicalness\n"
    + "You gain some Mysticality points!\n"
    + "You gain a Level!\n"
    + "\n"
    + "[9] The Dark Neck of the Woods\n"
    + "Encounter: Your Neck of the Woods\n"
    + "Took choice 1428/2: advance quest 2 steps\n"
    + "\n"
    + "[10] Your Mushroom Garden\n"
    + "Encounter: The Mushy Center\n"
    + "Took choice 1410/2: Pick the mushroom\n"
    + "choice.php?pwd&whichchoice=1410&option=2\n"
    + "You acquire an item: free-range mushroom\n"
    + "";

  await createTestStore(sampleText);
  const firstEntry = logStore.getEntryAt(0);
  const pillKeeperEntry = logStore.findNextEntry(0, {
    isPillKeeper: true,
  });
  const sneakisolEntry = logStore.findNextEntry(1, {
    isNonCombatEncounter: true,
  });

  expect(pillKeeperEntry.entryType).toBe(ENTRY_TYPE.IOTM.PILL_KEEPER);
  expect(pillKeeperEntry.hasText(REGEX.PILL_KEEPER.SNEAKISOL)).toBe(true);
  expect(pillKeeperEntry.additionalDisplay).toBe("The Dark Neck of the Woods");

  expect(sneakisolEntry.entryType).toBe(ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.SPECIAL_NONCOMBAT);
  expect(sneakisolEntry.isForcedAdventure).toBe(true);
});
