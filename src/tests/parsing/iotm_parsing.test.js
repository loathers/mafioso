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

test('iotm_parsing: Box O Ghosts: Ghost of Crimbo Carols: hasBoxOfGhosts: detects that an effect was granted', async () => {
  const sampleText = "[365] The Oasis\n"
    + "Encounter: rolling stone\n"
    + "Round 0: dextrial wins initiative!\n"
    + "Round 1: Ghost of Wants considers the stuff your opponent is made of, then sings you a carol about stuff.\n"
    + "You acquire an effect: All I Want For Crimbo Is Stuff (15)\n"
    + "Round 1: dextrial uses the human musk!\n"
    + "This combat did not cost a turn";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.hasBoxOfGhosts).toBe(true);
});

test('iotm_parsing: Box O Ghosts: Ghost of Crimbo Commerce: hasBoxOfGhosts: detects that player bought the item', async () => {
  const sampleText = "[41] The Defiled Niche\n"
    + "Encounter: dirty old lihc\n"
    + "Round 0: dextrial wins initiative!\n"
    + "Round 1: You lose 3 hit points\n"
    + "Round 1: dextrial attacks!\n"
    + "Round 2: dirty old lihc takes 186 damage.\n"
    + "Round 2: dextrial wins the fight!\n"
    + "After Battle: Either way, your Evilometer beeps three times.\n"
    + "After Battle: \"Aroma of Juniper,\" was the label in this region. You look inside a hollowed-out tome of arcane knowledge and find the source.\n"
    + "You acquire an item: bottle of gin\n"
    + "After Battle: \"Hey, you bought a murky potion!\" Glutton O'Ghostly says. \"That's the Crimbo spirit!\"\n"
    + "After Battle: You gain 323 Muscleboundness\n"
    + "After Battle: You gain 201 Mysteriousness\n"
    + "After Battle: You gain 219 Roguishness";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.hasBoxOfGhosts).toBe(true);
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

test('iotm_parsing: Diabolic Pizza Cube: detects making and building the correct additionalDisplay', async () => {
  const sampleText = "pizza porquoise, old bronzer, leftovers of indeterminate origin, old eyebrow pencil\n"
    + "You acquire an item: diabolic pizza";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE);
  expect(firstEntry.additionalDisplay).toBe('(POLO)');
});

test('iotm_parsing: Diabolic Pizza Cube: supports eating a Diabolic Pizza and displaying the initials used', async () => {
  const sampleText = "eat 1 diabolic pizza\n"
    + "You acquire an item: Pocket Professor memory chip\n"
    + "You acquire an effect: HGH-charged (25)\n"
    + "You gain 3 Fullness";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT);
});

test('iotm_parsing: Emotion Chip: isEmotionChip: detects if a combat adventure has emotion chip skill used', async () => {
  const sampleText = "[262] Lair of the Ninja Snowmen\n"
    + "Encounter: Ninja Snowman\n"
    + "Round 0: dextrial loses initiative!\n"
    + "Round 14: dextrial casts FEEL SUPERIOR!\n"
    + "Round 15: Ninja Snowman (Hilt) takes 22 damage.\n"
    + "Round 15: You gain 1 PvP Fight\n"
    + "Round 15: dextrial wins the fight!\n"
    + "After Battle: Ghost of Wants does that one dance, the ones that visions of sugarplums do in your head.\n"
    + "You acquire an item: plain snowcone\n"
    + "After Battle: You gain 40 Beefiness\n"
    + "After Battle: You gain 12 Wizardliness\n"
    + "After Battle: You gain 14 Cheek";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.isEmotionChip).toBe(true);
});

test('iotm_parsing: Emotion Chip: Feel Envy is a disentigrater', async () => {
  const sampleText = "[230] Hippy Camp\n"
    + "Encounter: filthy hippy Vegan chef\n"
    + "Round 0: dextrial wins initiative!\n"
    + "Round 1: dextrial casts FEEL ENVY!\n"
    + "Round 2: dextrial attacks!\n"
    + "Round 3: filthy hippy Vegan chef takes 358 damage.\n"
    + "Round 3: dextrial wins the fight!\n"
    + "You acquire an item: tambourine bells\n"
    + "You acquire an item: filthy corduroys\n"
    + "You acquire an item: filthy knitted dread sack\n"
    + "You acquire an item: wad of tofu\n"
    + "You acquire an item: reodorant\n"
    + "You acquire an item: patchouli incense stick\n"
    + "You acquire an item: filthy pestle\n"
    + "You acquire an item: double-barreled sling\n"
    + "After Battle: You gain 32 Fortitude";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.isDisintegrated).toBe(true);
});

test('iotm_parsing: Emotion Chip: Feel Hatred is a banisher', async () => {
  const sampleText = "[314] The Red Zeppelin\n"
    + "Encounter: Red Herring\n"
    + "Round 0: dextrial wins initiative!\n"
    + "Round 1: dextrial casts FEEL HATRED!\n"
    + "This combat did not cost a turn";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.isBanished).toBe(true);
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

test('iotm_parsing: Hewn moon-rune spoon: parses and recognizes it is tuning', async () => {
  const sampleText = "//this is a test comment\n"
   + "tuning moon to The Packrat";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.entryType).toBe(ENTRY_TYPE.IOTM.HEWN_MOON_RUNE_SPOON);
  expect(firstEntry.locationDisplay).toBe('Hewn Moon Rune Spoon Tune');
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
