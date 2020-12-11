import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

test('unique: Horsery: handles parsing the type of horse chosen', async () => {
  const sampleText = "Visiting The Horsery\n"
    +"Took choice 1266/2: Rent This Horse\n"
    +"choice.php?option=2&whichchoice=1266&pwd\n"
    +"Chose the dark horse\n";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.encounterDisplay).toBe('dark horse');
});
