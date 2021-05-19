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
