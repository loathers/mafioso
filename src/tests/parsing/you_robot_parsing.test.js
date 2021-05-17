import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('parsing: you, robot: parses activating the chronolith', async () => {
  const sampleText = "Activating the Chronolith\n"
    + "You gain 10 Adventures";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.YOU_ROBOT.CHRONOLITH);
});
