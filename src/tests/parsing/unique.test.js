import assert from 'assert';

import {LogStore} from 'store/LogStore';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('unique: Horsery: handles parsing the type of horse chosen', async () => {
  const sampleText = "Visiting The Horsery\n"
    + "Took choice 1266/2: Rent This Horse\n"
    + "choice.php?option=2&whichchoice=1266&pwd\n"
    + "Chose the dark horse\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.encounterDisplay).toBe('dark horse');
});

test('unique: Calculate the Universe: handles parsing what number was used for Numberology', async () => {
  const sampleText = "cast 1 Calculate the Universe\n"
    + "[26] numberology 89\n"
    + "You gain 165 Beefiness\n"
    + "You gain a Muscle point!\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.encounterDisplay).toBe('Numberology 89');
});


test('unique: Sweet Synthesis: handles parsing the two items used for synthesize', async () => {
  const sampleText = "cast 1 Sweet Synthesis\n"
    + "Encounter: Sweet Synthesis\n"
    + "\n"
    + "synthesize 1 Rock Pops, peppermint sprout\n";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.encounterDisplay).toBe('Rock Pops + peppermint sprout');
});
