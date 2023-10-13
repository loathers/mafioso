import { test, expect } from "vitest";

// import ENTRY_TYPE from '../constants/ENTRY_TYPE';

import { LogStore } from "../../store/logStore";

async function createTestStore(text: string) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test("rawtext_parsing: handles Subscription Cocoa Dispenser", async () => {
  const sampleText =
    "use 1 subscription cocoa dispenser" +
    '\n--------------------\n10654 boiling hot cocoa...\nItem  boiling hot cocoa Effect: "Cocoa-Crispy", Effect Duration: 20\n--------------------' +
    "\n--------------------\n2604  Cocoa-Crispy  coffeecup.gif\nEffect  Cocoa-Crispy  Mysticality Percent: +100\n--------------------" +
    "\nYou acquire an item: cool hot cocoa\n";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const comparatorResult = testStore.rawText?.match("--------------------");
  expect(comparatorResult).toBe(null);
});

test('rawtext_parsing: presplit: splits the text after "This combat did not cost a turn"', async () => {
  const sampleText =
    "After Battle: You gain 168 Sarcasm\n" +
    "You gain some Moxie points!\n" +
    "This combat did not cost a turn\n" +
    "You acquire an item: strange leaflet";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(2);
});

test('rawtext_parsing: presplit: splits the text when something unrelated is after combat, like "took choice"', async () => {
  const sampleText =
    "[16] The Neverending Party\n" +
    "Encounter: burnout\n" +
    "Round 0: worthawholebean wins initiative!\n" +
    "Round 1: worthawholebean casts CURSE OF WEAKSAUCE!\n" +
    "Round 2: burnout drops 13 attack power.\n" +
    "Round 2: burnout drops 14 defense.\n" +
    "Round 2: worthawholebean casts SING ALONG!\n" +
    "Round 3: burnout drops 11 attack power.\n" +
    "Round 3: burnout drops 12 defense.\n" +
    "Round 3: worthawholebean casts SAUCESTORM!\n" +
    "Round 8: worthawholebean wins the fight!\n" +
    "Your familiar gains a pound: JXQZ, the 2 lb. Red-Nosed Snapper\n" +
    "You gain 207 Meat\n" +
    "After Battle: JXQZ either performs an energetic can-can dance, or flops around on the ground gasping for air.\n" +
    "You acquire an item: van key\n" +
    "You acquire an item: jam band bootleg\n" +
    "After Battle: Crazy Biggles psychically links with you and draws out your latent power. Or maybe it's just a contact high.\n" +
    "You acquire an effect: Frost Tea (5)\n" +
    "After Battle: You gain 493 Strongness\n" +
    "You gain some Muscle points!\n" +
    "After Battle: You gain 185 Enchantedness\n" +
    "You gain some Mysticality points!\n" +
    "After Battle: You gain 140 Sarcasm\n" +
    "You gain a Moxie point!\n" +
    "Took choice 1437/3: unknown\n" +
    "choice.php?whichchoice=1437&option=3&pwd\n" +
    "Took choice 1437/1: Change Superhero\n" +
    "choice.php?whichchoice=1437&option=1&pwd\n" +
    "Took choice 1438/1: unknown\n" +
    "choice.php?whichchoice=1438&option=1&pwd\n" +
    "Took choice 1438/4: I'm Good\n" +
    "choice.php?whichchoice=1438&option=4&pwd\n" +
    "Took choice 1437/6: I'm Done\n" +
    "choice.php?whichchoice=1437&option=6&pwd";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(2);
});

test("rawtext_parsing: presplit: does not split when nuns take meat", async () => {
  const sampleText =
    "[104] The Themthar Hills\n" +
    "Encounter: dirty thieving brigand\n" +
    "Round 0: worthawholebean loses initiative!\n" +
    "Round 1: worthawholebean casts BECOME A WOLF!\n" +
    "You acquire an effect: Wolfish Form (1)\n" +
    "Round 2: worthawholebean executes a macro!\n" +
    "Round 2: worthawholebean casts CURSE OF WEAKSAUCE!\n" +
    "Round 5: worthawholebean wins the fight!\n" +
    "The nuns take 11,619 Meat; 11,619 recovered, 88,381 left to recover.\n" +
    "After Battle: Dark River gives you some meat under the table.\n" +
    "You gain 13 Meat.\n" +
    "After Battle: Busta_Rhymes whistles innocently while doing a soft-shoe and gives you a wink.\n" +
    "After Battle: You gain 46 Fortitude\n" +
    "After Battle: You gain 21 Mysteriousness\n" +
    "After Battle: You gain 18 Chutzpah\n" +
    "After Battle: Busta_Rhymes stands around casually, definitely just loitering and not casing the joint at all.";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(1);
});

test("rawtext_parsing: presplit: does not split when hippies are defeated", async () => {
  const sampleText =
    "[157] The Battlefield (Frat Uniform)\n" +
    "Encounter: War Hippy Fire Spinner\n" +
    "Round 0: worthawholebean wins initiative!\n" +
    "Round 1: You lose 10 hit points\n" +
    "Round 1: worthawholebean uses the powdered madness!\n" +
    "Round 2: worthawholebean wins the fight!\n" +
    "After Battle: Stabert kicks you in the neck, in just the right place to be very effective chiropracty. If that's a word.\n" +
    "After Battle: You gain 36 hit points\n" +
    "After Battle: You gain 29 Muscularity Points\n" +
    "After Battle: Dark River stealths up to you, crawling on her elbows. She gives you some meat that she found down there.\n" +
    "You gain 15 Meat.\n" +
    "After Battle: You hear a loud schlurrrrrk! noise, and turn to see Stabert sucking the liquid out of a bottle of malt liquor he found somewhere. (13% full)\n" +
    "After Battle: You gain 46 Strengthliness\n" +
    "You gain a Muscle point!\n" +
    "After Battle: You gain 26 Wizardliness\n" +
    "After Battle: You gain 22 Sarcasm\n" +
    "After Battle: After the battle, you settle down on a spot in a hippy's filthy dread sack and let the leylines restore you.\n" +
    "You acquire an effect: Cartographically Charged (10)\n" +
    "This combat did not cost a turn\n" +
    "32 hippies defeated; 544 down, 456 left.";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(1);
});

test('rawtext_parsing: presplit: does not split when "Using the Force"', async () => {
  const sampleText =
    "[267] The Hidden Bowling Alley\n" +
    "Encounter: pygmy orderlies\n" +
    "Round 0: worthawholebean wins initiative!\n" +
    "Round 1: worthawholebean casts CHEAT CODE: REPLACE ENEMY!\n" +
    "Round 2: your opponent becomes a pygmy bowler!\n" +
    "Round 2: worthawholebean casts USE THE FORCE!\n" +
    "Encounter: Using the Force\n" +
    "Took choice 1387/3: &quot;You will drop your things and walk away.&quot;choice.php?pwd&whichchoice=1387&option=3\n" +
    "You acquire an item: bowling ball\n" +
    "You acquire an item: tiny bowler\n" +
    "You acquire an item: imitation White Russian";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(1);
});
