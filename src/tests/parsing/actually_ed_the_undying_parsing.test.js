import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('actually_ed_the_undying_parsing: parses finding MacGuffin entry', async () => {
  const sampleText = "[537] The Secret Council Warehouse\n"
    + "Encounter: You Found It!\n"
    + "You acquire an item: Holy MacGuffin";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.ACTUALLY_ED_THE_UNDYING.FOUND_MACGUFFIN);
});


test('actually_ed_the_undying_parsing: parses returning MacGuffin entry', async () => {
  const sampleText = "place.php?whichplace=edbase&action=edbase_altar\n"
    + "Encounter: Returning the MacGuffin\n"
    + "Took choice 1054/1: Yep\n"
    + "choice.php?pwd&whichchoice=1054&option=1\n"
    + "Encounter: Returning the MacGuffin\n"
    + "Took choice 1055/4: or a jerk Sauceror\n"
    + "choice.php?pwd&whichchoice=1055&option=4\n"
    + "Now walking on the Sauceror road.";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.ACTUALLY_ED_THE_UNDYING.RETURN_MACGUFFIN);
});
