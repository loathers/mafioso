import ENTITY_TYPE from './ENTITY_TYPE';

/**
 * https://kol.coldfront.net/thekolwiki/index.php/Insta-kill
 * 
 * @typedef {Entity} Instakills
 */
export const INSTAKILLS_MAP = {
  'Chest X-Ray': {
    matcher: /casts.*Chest X-Ray/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Implode Universe': {
    matcher: /casts.*Implode Universe/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'powdered madness': {
    matcher: /uses.*powdered madness/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Batter Up!': {
    matcher: /(uses|casts).*Batter Up!/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Carbohydrate Cudgel': {
    matcher: /(uses|casts).*Carbohydrate Cudgel/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Fire the Jokester\'s Gun': {
    matcher: /(uses|casts).*Fire the Jokester's Gun/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'deliver your thesis': {
    matcher: /(uses|casts).*deliver your thesis/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Gingerbread Mob Hit': {
    matcher: /(uses|casts).*Gingerbread Mob Hit/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Release the Boots': {
    matcher: /(uses|casts).*Release the Boots/i,
    entityType: ENTITY_TYPE.FAMILIAR,
  },
  'Science! Fight with Rational Thought': {
    matcher: /(uses|casts).*Science! Fight with Rational Thought/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Shattering Punch': {
    matcher: /(uses|casts).*Shattering Punch/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Trap Ghost': {
    matcher: /(uses|casts).*Trap Ghost/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Bifurcating Blow': {
    matcher: /(uses|casts).*Bifurcating Blow/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Bear Hug': {
    matcher: /(uses|casts).*Bear Hug/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Walk Away From Explosion': {
    matcher: /(uses|casts).*Walk Away From Explosion/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Lightning Strike': {
    matcher: /(uses|casts).*Lightning Strike/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
}

export const INSTAKILLS = Object.keys(INSTAKILLS_MAP);