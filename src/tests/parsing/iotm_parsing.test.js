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

test('iotm_parsing: Comprehensive Cartography: handles parsing an encounter from Map the Monsters', async () => {
  const sampleText = "[18] The Beanbat Chamber\n"
    +"Took choice 1435/1: unknown\n"
    +"choice.php?forceoption=0&option=1&pwd&whichchoice=1435&heyscriptswhatsupwinkwink=48\n"
    +"Encounter: beanbat\n"
    +"Round 0: eaf marine loses initiative!\n"
    +"Round 1: You lose 7 hit points\n"
    +"Round 1: eaf marine casts UNLEASH THE DEVIL'S KISS!\n"
    +"You acquire an effect: Everything Looks Yellow (99)\n"
    +"Round 2: eaf marine wins the fight!\n"
    +"After Battle: To avoid overloading its circuits, Einsteinomatic dumps some excess electricity into you.\n"
    +"After Battle: You gain 33 Muscularity Points\n"
    +"You gain 45 Meat\n"
    +"After Battle: Einsteinomatic displays \"PHYSICS IS THE DANCE OF THE UNIVERSE.\"\n"
    +"You acquire an item: enchanted bean\n"
    +"You acquire an item: sonar-in-a-biscuit\n"
    +"After Battle: You gain 39 Fortitude\n"
    +"You gain a Muscle point!\n"
    +"After Battle: You gain 10 Mysteriousness\n"
    +"After Battle: You gain 15 Sarcasm\n";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.MAP_THE_MONSTER);
});

test('iotm_parsing: Comprehensive Cartography: handles parsing a special noncombat', async () => {
  const sampleText = "[78] The Haunted Billiards Room"
    + "Encounter: Billiards Room Options"
    + "Took choice 1436/1: aquire pool cue"
    + "choice.php?pwd&whichchoice=1436&option=1"
    + "You acquire an item: pool cue";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.COMPREHENSIVE_CARTOGRAPHY.SPECIAL_NONCOMBAT);
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
