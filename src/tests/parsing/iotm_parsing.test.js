import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
};

test('iotm_parsing: April Shower: parses and shows effect gotten', async () => {
  const sampleText = "shower cool\n"
    + "You acquire an effect: So Fresh and So Clean (50)\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.APRIL_SHOWER);
  expect(firstEntry.locationDisplay).toBe('April Shower');
  expect(firstEntry.encounterDisplay).toBe('So Fresh and So Clean');
});

test('iotm_parsing: Cargo Cultist Shorts: handles opening an item pocket', async () => {
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

test('iotm_parsing: God Lobster: supports getting a boon choice adventure', async () => {
  const sampleText = "[16] God Lobster\n"
    + "Encounter: Granted a Boon\n"
    + "Took choice 1310/1: &quot;I'd like part of your regalia.&quot;\n"
    + "choice.php?pwd&whichchoice=1310&option=1\n"
    + "You acquire an item: God Lobster's Scepter";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON);
  expect(firstEntry.additionalDisplay).toBe('"I\'d like part of your regalia."');
});

test('iotm_parsing: SpinMaster lathe: groups text if it has flimy hardwood scraps from using it the first time', async () => {
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

test('iotm_parsing: SpinMaster lathe: no extra types from subsequent uses', async () => {
  const sampleText = "Visiting Your SpinMaster&trade; lathe\n\n"
    + "trading 1 flimsy hardwood scraps for 1 weeping willow wand\n"
    + "You acquire an item: weeping willow wand";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.SPINMASTER_LATHE.MAKE_ITEM);
});

test('iotm_parsing: Meteore Lore: determines `hasMeteorLore` if skills are present', async () => {
  const sampleText = "[2] The Overgrown Lot\n"
    + "Encounter: the ghost of Oily McBindle wearing a monkey mask\n"
    + "Round 0: dextrial loses initiative!\n"
    + "Round 1: dextrial attacks!\n"
    + "Round 2: the ghost of Oily McBindle takes 78 damage.\n"
    + "Round 2: dextrial casts SHOOT GHOST!\n"
    + "You acquire an item: shysterweed\n"
    + "After Battle: You rush to the location of an imminent meteor strike just in time to see the meteorite collide with an energy drink, knocking out all of the calories. A marketing rep from the beverage company quickly rebrands the bottle and gives it to you as a promotional free sample.\n"
    + "You acquire an item: Meteorite-Ade\n";

  const testStore = await createTestStore(sampleText);

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.hasMeteorLore).toBe(true);
});
