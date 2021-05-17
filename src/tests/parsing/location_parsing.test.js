import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('parsing: location: recognizes "Cake-Shaped Arena" location', async () => {
  const sampleText = "[43] Cake-Shaped Arena\n"
    + "Familiar: HAL Jaffee 5318008, the 19 lb. Pocket Professor\n"
    + "Opponent: Sir Suck, the 19 lb. Mosquito\n"
    + "Contest: Scavenger Hunt\n"
    + "HAL Jaffee 5318008 gains 4 experience.";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.LOCATION.CAKE_SHAPED_ARENA);
  expect(firstEntry.attributes.locationName).toBe('Cake-Shaped Arena');
  expect(firstEntry.encounterDisplay).toBe('Pocket Professor competing in Scavenger Hunt');
});
