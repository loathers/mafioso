import ENTITY_TYPE from 'constants/ENTITY_TYPE';

/**
 * @typedef {Entity} ATTRACTORS
 */
export const ATTRACTORS_MAP = {
  'Gallapagosian Mating Call': {
    matcher: /(uses|casts).*GALLAPAGOSIAN MATING CALL/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Latte Share': {
    matcher: /(uses|casts).*OFFER LATTE TO OPPONENT/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Transcendent Olfraction': {
    matcher: /(uses|casts).*TRANSCENDENT OLFACTION/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Get a Good Whiff of this Guy': {
    matcher: /(uses|casts).*GET A GOOD WHIFF OF THIS GUY/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Perceive Soul': {
    matcher: /(uses|casts).*PERCEIVE SOUL/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Make Friends': {
    matcher: /(uses|casts).*MAKE FRIENDS/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
}

export const ATTRACTORS = Object.keys(ATTRACTORS_MAP);