import { test, expect } from "vitest";

import ENTRY_TYPE from "../../constants/ENTRY_TYPE";

import { LogStore } from "../../store/logStore";

async function createTestStore(text: string) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test("entry_parsing: items: supports zap", async () => {
  const sampleText =
    "zap Sneaky Pete's breath spray\n" +
    "You acquire an item: Sneaky Pete's key";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.ITEMS.ZAP);
  expect(firstEntry.encounterDisplay).toBe("Sneaky Pete's key");
});
