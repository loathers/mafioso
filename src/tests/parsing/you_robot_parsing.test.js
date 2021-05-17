import assert from 'assert';

import ENTRY_TYPE from 'constants/ENTRY_TYPE';

import {LogStore} from 'store/LogStore';

import * as entryParserUtils from 'utilities/entryParserUtils';

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

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
