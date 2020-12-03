import assert from 'assert';

import {LogStore} from 'store/LogStore';

test('iotm_parsing: handles Cargo Cultist Shorts', async () => {
  const sampleText = "Inspecting Cargo Cultist Shorts\npicking pocket 177\nYou acquire an item: Yeg's Motel hand soap";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.locationDisplay).toBe('Cargo Cultist Shorts');
});
