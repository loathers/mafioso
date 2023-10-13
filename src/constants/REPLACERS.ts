import ENTITY_TYPE from "./ENTITY_TYPE";

/**
 * https://kol.coldfront.net/thekolwiki/index.php/Insta-kill
 *
 * @todo Unleash Nanites
 */
export const REPLACERS = {
  "Powerful Glove Replace": {
    matcher: /casts.*CHEAT CODE: Replace Enemy/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  "tangle of rat tails": {
    matcher: /uses.*tangle of rat tails/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  Macrometeorite: {
    matcher: /casts.*Macrometeorite/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  CLEESH: {
    matcher: /casts.*CLEESH/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "software glitch": {
    matcher: /(uses|casts).*software glitch/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Daily Affirmation: Adapt to Change Eventually": {
    matcher: /(uses|casts).*Daily Affirmation: Adapt to Change Eventually/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "wand of pigification": {
    matcher: /(uses|casts).*wand of pigification/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
};
