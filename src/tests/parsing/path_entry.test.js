import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('unique: Grey Goo: parses a grey goo monster', async () => {
  const sampleText = "[144] The Goo-Shrouded Palindome\n"
    + "Encounter: grey goo orb\n"
    + "Round 0: Captain Scotch wins initiative!\n"
    + "Round 1: Captain Scotch casts CARBOHYDRATE CUDGEL!\n"
    + "Round 2: Captain Scotch wins the fight!\n"
    + "After Battle: Weird Jiminy shares some of his loco weed with you. It's powerful stuff!\n"
    + "You acquire an effect: Space Cadet (5)\n"
    + "After Battle: You gain 129 Strongness\n"
    + "You gain some Muscle points!\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.GREY_GOO.GOO_MONSTER);
  expect(firstEntry.isPathSpecific).toBe(true);
});
