/**
 * List of all the sniffing strings, & whether they're items or skills. Sources in comments. Note that at initial construction of this parser they're all skills; I just want to maintain matching syntax.
 */
export const SNIFFS = [
  // PERMASTANDARD & PATH sniffs
  { name: "TRANSCENDENT OLFACTION", type: "skill" }, // bounty hunting reward
  { name: "GET A GOOD WHIFF OF THIS GUY", type: "skill" }, // skill attained via nosy nose fam
  { name: "PERCEIVE SOUL", type: "skill" }, // PATH: dark gyffte
  { name: "MAKE FRIENDS", type: "skill" }, // PATH: avatar of sneaky pete
  { name: "MOTIF", type: "skill" }, // PATH: avatar of shadows over loathing
  // IOTM sniffs
  { name: "GALLAPAGOSIAN MATING CALL", type: "skill" }, // bounty hunting reward
  { name: "OFFER LATTE TO OPPONENT", type: "skill" }, // 2018 latte lovers member card
  { name: "MONKEY POINT", type: "skill" }, // 2023 cursed monkey paw
] as const;
