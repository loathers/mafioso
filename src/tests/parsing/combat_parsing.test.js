import assert from 'assert';

import ENTRY_TYPE from '../constants/ENTRY_TYPE';

import {LogStore} from '../store/LogStore';

test('combat_parsing: detects "UNLEASH THE DEVILS KISS" skill as a disintegrater', async () => {
  const sampleText = "[235] Twin Peak\n"
    + "Took choice 1435/1: unknown\n"
    + "choice.php?forceoption=0&option=1&pwd&whichchoice=1435&heyscriptswhatsupwinkwink=1245\n"
    + "Encounter: spider (duck?) topiary animal\n"
    + "Round 0: dextrial wins initiative!\n"
    + "Round 1: dextrial casts %FN, SPIT ON THEM!!\n"
    + "Round 2: At your command, Fauci spits a tremendous globule of saliva at your foe. The shock and disgust completely overwhelm them, to the point of being literally beside themselves.\n"
    + "Round 2: dextrial casts UNLEASH THE DEVIL'S KISS!\n"
    + "You acquire an effect: Everything Looks Yellow (99)\n"
    + "Round 3: dextrial wins the fight!\n"
    + "After Battle: Your Iunion stones absorb some ambient wealth from the nearby hotel.\n"
    + "The crown gains +2% Meat Drops\n"
    + "After Battle: Fauci kicks you in the foot, in just the right place to be very effective chiropracty. If that's a word.\n"
    + "After Battle: You gain 41 hit points\n"
    + "After Battle: You gain 28 Mojo Points\n"
    + "After Battle: Some extra meat has appeared in your pouch when you weren't looking. Presumably Shadowy Buttercup's doing.\n"
    + "You gain 11 Meat.\n"
    + "After Battle: You hear a loud schlurrrrrk! noise, and turn to see Fauci sucking the liquid out of a wooden water barrel he found somewhere. (3% full)\n"
    + "You acquire an item: rusty hedge trimmers\n"
    + "You acquire an item: rusty hedge trimmers\n"
    + "You acquire an item: pestopiary\n"
    + "You acquire an item: pestopiary\n"
    + "You acquire an item: rusty hedge trimmers\n"
    + "You acquire an item: rusty hedge trimmers\n"
    + "You acquire an item: pestopiary\n"
    + "You acquire an item: pestopiary\n"
    + "After Battle: Fauci smiles. You're glad to not know what it's thinking about. (\n"
    + "After Battle: You gain 10 Strengthliness\n"
    + "After Battle: You gain 13 Enchantedness\n"
    + "After Battle: You gain 33 Chutzpah\n"
    + "After Battle: A mental X marks the spot 25 years later where you find a cache of mystical energy.";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.isDisintegrated).toBe(true);
});

test('combat_parsing: detects "SHOCKING LICK" skill as a disintegrater', async () => {
  const sampleText = "[151] The Haunted Laundry Room\n"
    + "Encounter: the cabinet of Dr. Limpieza\n"
    + "Round 0: Volc wins initiative!\n"
    + "Round 1: Volc casts SHOCKING LICK!\n"
    + "Round 2: Volc wins the fight!";

  const testStore = new LogStore();
  await testStore.prepareLog(sampleText);
  await testStore.parse();

  const firstEntry = testStore.allEntries[0];
  expect(firstEntry.isDisintegrated).toBe(true);
});
