import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

test('iotm_parsing: handles Cargo Cultist Shorts opening an item pocket', async () => {
  const sampleText = "Inspecting Cargo Cultist Shorts\npicking pocket 177\nYou acquire an item: Yeg's Motel hand soap";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.CARGO_CULTIST_SHORTS.ITEM_POCKET);
});

test('iotm_parsing: handles parsing SpinMaster lathe', async () => {
  const sampleText = "Visiting Your SpinMaster&trade; lathe\n\ntrading 1 flimsy hardwood scraps for 1 weeping willow wand\nYou acquire an item: weeping willow wand\n";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.SPINMASTER_LATHE.MAKE_ITEM);
});
