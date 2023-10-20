/**
 * List of all the free kills, & whether they're items or skills. Sources in comments.
 */
export const FREE_KILLS = [
  // PATH & PERMASTANDARD free kills
  { name: "glark cable", type: "item" }, // 5/day freekill, red zeppelin
  { name: "LIGHTNING STRIKE", type: "skill" }, // PATH: heavy rains
  { name: "FREE-FOR-ALL", type: "skill" }, // PATH: avatar of shadows over loathing
  { name: "FONDELUGE", type: "skill" }, // PATH: avatar of shadows over loathing
  // IOTM free kills
  { name: "SHATTERING PUNCH", type: "skill" }, // 2016 snojo
  { name: "FIRE THE JOKESTER'S GUN", type: "skill" }, // 2016 batfellow
  { name: "GINGERBREAD MOB HIT", type: "skill" }, // 2016 gingerbread city
  { name: "MISSILE LAUNCHER", type: "skill" }, // 2017 asdon-martin
  { name: "CHEST X-RAY", type: "skill" }, // 2019 lil doc bag
  { name: "SHOCKING LICK", type: "skill" }, // 2021 power seed
  { name: "SPIT JURASSIC ACID", type: "skill" }, // 2022 jurassic parka
  { name: "superduperheated metal", type: "item" }, // 2015 that 70s volcano
  { name: "power pill", type: "item" }, // 2015 yellow puck
  { name: "replica bat-oomerang", type: "item" }, // 2016 batfellow
  { name: "Daily Affirmation: Think Win-Lose", type: "item" }, // 2017 new-you affirmations
  { name: "powdered madness", type: "item" }, // 2019 red-nosed snapper
  { name: "groveling gravel", type: "item" }, // 2023 rock garden guide
  { name: "shadow brick", type: "item" }, // 2023 closed-circuit payphone
] as const;
