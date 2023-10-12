import assert from 'assert';

import ENTRY_TYPE from '../constants/ENTRY_TYPE';

import {LogStore} from '../store/LogStore';

import * as entryParserUtils from '../utilities/entryParserUtils';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('entryParserUtils.parseYouRobotAttributes(): parses changes in gaining and losing scrap', () => {
  const sampleText = "After Battle: You gain 1 scrap\n"
    + "After Battle: You gain 1 scrap\n"
    + "After Battle: You gain 1 energy\n"
    + "After Battle: You lose 1 energy\n"
    + "After Battle: You lose 1 energy";

  const result = entryParserUtils.parseYouRobotAttributes(sampleText);
  expect(result.scrapChange).toBe(2);
  expect(result.energyChange).toBe(-1);
});


test('parsing: you, robot: parses activating the chronolith', async () => {
  const sampleText = "Activating the Chronolith\n"
    + "You gain 10 Adventures";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.YOU_ROBOT.CHRONOLITH);
});

test('parsing: you, robot: parses scavenge scrap', async () => {
  const sampleText = "[1] Scavenging scrap\n"
    + "You gain 38 scrap\n"
    + "You gain 50 hit points";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.YOU_ROBOT.SCAVENGE_SCRAP);
});

test('parsing: you, robot: parses collecting energy', async () => {
  const sampleText = "[2] Collecting energy\n"
    + "You gain 37 Energy";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.YOU_ROBOT.COLLECT_ENERGY);
});

test('parsing: you, robot: parses upgrade at statbot', async () => {
  const sampleText = "Took choice 1447/3: Upgrade Moxie by 5"
    + "choice.php?pwd&whichchoice=1447&option=3\n"
    + "You gain 1205 Chutzpah\n"
    + "You gain some Moxie points!";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.allEntries[0];

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.PATH.YOU_ROBOT.STATBOT_UPGRADE);
});
