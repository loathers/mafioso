import assert from 'assert';

// import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

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
