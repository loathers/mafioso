import assert from "assert";

import ENTRY_TYPE from "../constants/ENTRY_TYPE";

import { LogStore } from "../store/LogStore";

async function createTestStore(text) {
  const testStore = new LogStore();
  await testStore.prepareLog(text);
  await testStore.parse();
  return testStore;
}

test('entry_parsing: items: parses "you acquire an item: {name}"', async () => {
  const sampleText =
    "use 1 pork elf goodies sack\n" +
    "You acquire an item: baconstone\n" +
    "You acquire an item: hamethyst\n" +
    "You acquire an item: hamethyst\n" +
    "You acquire an item: baconstone\n" +
    "You acquire an item: hamethyst";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.attributes.acquiredItems.length).toBe(5);
  expect(firstEntry.attributes.acquiredItems[0].attributes.amount).toBe(1);
});

test('entry_parsing: items: parses "you acquire {name} ({amount})"', async () => {
  const sampleText =
    "buy 10 Doc Galaktik's Homeopathic Elixir for 120 each from Doc Galaktik's Medicine Show\n" +
    "You spent 1,200 Meat\n" +
    "You acquire Doc Galaktik's Homeopathic Elixir (10)";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.attributes.acquiredItems.length).toBe(1);
  expect(firstEntry.attributes.acquiredItems[0].attributes.name).toBe(
    "Doc Galaktik's Homeopathic Elixir",
  );
  expect(firstEntry.attributes.acquiredItems[0].attributes.amount).toBe(10);
});

test("entry_parsing: untinker: detects that something is a untinker action", async () => {
  const sampleText =
    "untinker 1 oyster basket\n" +
    "You acquire an item: tisket\n" +
    "You acquire an item: tasket";

  const testStore = await createTestStore(sampleText);
  const firstEntry = testStore.getEntryAt(0);

  expect(firstEntry.entryType).toBe(ENTRY_TYPE.ITEMS.UNTINKER);
});
