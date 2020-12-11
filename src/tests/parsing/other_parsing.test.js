import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('parsing: handles "telescope look high" and getting the effect', async () => {
  const sampleText = "telescope look high\n"
    + "You acquire an effect: Starry-Eyed (10)\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.EFFECTS.LOOK_TELESCOPE);
  expect(firstEntry.encounterDisplay).toBe('Starry-Eyed');
});
