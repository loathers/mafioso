import assert from 'assert';

// import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
};

test('rawtext_parsing: handles Subscription Cocoa Dispenser', async () => {
  const sampleText = 'use 1 subscription cocoa dispenser'
    + '\n--------------------\n10654 boiling hot cocoa...\nItem  boiling hot cocoa Effect: "Cocoa-Crispy", Effect Duration: 20\n--------------------'
    + '\n--------------------\n2604  Cocoa-Crispy  coffeecup.gif\nEffect  Cocoa-Crispy  Mysticality Percent: +100\n--------------------'
    + '\nYou acquire an item: cool hot cocoa\n';

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const comparatorResult = testStore.rawText.match('--------------------');
  expect(comparatorResult).toBe(null);
});

test('rawtext_parsing: presplit: splits the last line of combat from whatever comes after', async () => {
  const sampleText = "After Battle: You gain 140 Sarcasm\n"
    + "You gain a Moxie point!\n"
    + "This combat did not cost a turn\n"
    + "Took choice 1437/3: unknown\n"
    + "choice.php?whichchoice=1437&option=3&pwd\n"
    + "Took choice 1437/1: Change Superhero\n"
    + "choice.php?whichchoice=1437&option=1&pwd\n";

  const testStore = await createTestStore(sampleText);
  expect(testStore.allEntries.length).toBe(2);
});
