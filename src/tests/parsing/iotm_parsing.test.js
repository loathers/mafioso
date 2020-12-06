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

test('iotm_parsing: handles grouping SpinMaster lathe using it the first time', async () => {
  const sampleText = "Visiting Your SpinMaster&trade; lathe\n"
    + "You acquire an item: flimsy hardwood scraps\n\n"
    + "trading 1 flimsy hardwood scraps for 1 weeping willow wand\n"
    + "You acquire an item: weeping willow wand";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.SPINMASTER_LATHE.MAKE_ITEM);
});

test('iotm_parsing: handles grouping SpinMaster lathe without flimsy hardwood scraps', async () => {
  const sampleText = "Visiting Your SpinMaster&trade; lathe\n\n"
    + "trading 1 flimsy hardwood scraps for 1 weeping willow wand\n"
    + "You acquire an item: weeping willow wand";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.SPINMASTER_LATHE.MAKE_ITEM);
});

test('iotm_parsing: handles parsing Subscription Cocoa Dispenser', async () => {
  const sampleText = "use 1 subscription cocoa dispenser\nYou acquire an item: cool hot cocoa\nYou acquire an item: boiling hot cocoa\nYou acquire an item: hot cocoa with rainbow marshmallows";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.SUBSCRIPTION_COCOA_DISPENSER);
});
