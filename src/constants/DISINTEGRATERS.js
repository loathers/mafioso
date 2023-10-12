import ENTITY_TYPE from "./ENTITY_TYPE";

/**
 * https://kol.coldfront.net/thekolwiki/index.php/Yellow_ray_strategy
 *
 * todo: support Nanorhino, He-Boulder
 *
 * @typedef {Entity} Disintegraters
 */
export const DISINTEGRATERS_MAP = {
  Disintegrate: {
    matcher: /(uses|casts).*Disintegrate/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Cosplay Saber Yellow Ray": {
    matcher: /You will drop your things and walk away/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  Micronova: {
    matcher: /(uses|casts).*micronova/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  Explodinall: {
    matcher: /Explodinall/i,
    entityType: ENTITY_TYPE.OTHER,
  },
  "MISSILE LAUNCHER": {
    matcher: /(uses|casts).*MISSILE LAUNCHER/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Open a Big Yellow Present": {
    matcher: /(uses|casts).*Open a Big Yellow Present/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Viral Video": {
    matcher: /(uses|casts).*viral video/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "mayo lance": {
    matcher: /(uses|casts).*mayo lance/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "unbearable light": {
    matcher: /(uses|casts).*unbearable light/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "yellowcake bomb": {
    matcher: /(uses|casts).*yellowcake bomb/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Golden Light": {
    matcher: /(uses|casts).*Golden Light/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Ball Lightning": {
    matcher: /(uses|casts).*Ball Lightning/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Wrath of Ra": {
    matcher: /(uses|casts).*Wrath of Ra/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Unleash Cowrruption": {
    matcher: /(uses|casts).*Unleash Cowrruption/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Fireball Barrage": {
    matcher: /(uses|casts).*Fireball Barrage/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Unleash the Devils Kiss": {
    matcher: /(uses|casts).*UNLEASH THE DEVIL'S KISS/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  // -- needs verification
  "pulled yellow taffy": {
    matcher: /(uses|casts).*pulled yellow taffy/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Flash Headlight": {
    matcher: /(uses|casts).*Flash Headlight/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Spooky Jellied": {
    matcher: /Spooky Jellied/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Shocking Lick": {
    matcher: /Shocking Lick/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  // -- its a new category
  "Feel Envy": {
    matcher: /casts.*Feel Envy/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
};

export const DISINTEGRATERS = Object.keys(DISINTEGRATERS_MAP);
