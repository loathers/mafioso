import { test, expect } from "vitest";

import { LogStore } from "../../store/logStore";

async function createTestStore(text: string) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test("pregroup: Sweet Synthesis: handles grouping the cast menu and the mafia action", async () => {
  const sampleText =
    "cast 1 Sweet Synthesis\n" +
    "Encounter: Sweet Synthesis\n" +
    "\n" +
    "synthesize 1 Rock Pops, peppermint sprout\n";

  const expectedText =
    "cast 1 Sweet Synthesis\n" +
    "Encounter: Sweet Synthesis\n" +
    "synthesize 1 Rock Pops, peppermint sprout\n";

  const testStore = await createTestStore(sampleText);
  expect(testStore.rawText).toBe(expectedText);
});
