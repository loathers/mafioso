import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('preremove: handles removing the line with "... but KoLmafia thought it was"', async () => {
  const sampleText = "cast 1 Calculate the Universe\n"
    +"[1] numberology 14\n"
    +"moxie weed is not multiusable, but KoLmafia thought it was\n"
    +"You acquire moxie weed (14)\n";

  const expectedText = "cast 1 Calculate the Universe\n"
    +"[1] numberology 14\n"
    +"You acquire moxie weed (14)\n";

  const testStore = await createTestStore(sampleText);
  expect(testStore.rawText).toBe(expectedText);
});
