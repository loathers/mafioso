import ENTITY_TYPE from 'constants/ENTITY_TYPE';

//
export const COSPLAY_SABER_DISINTIGRATE = {
  matcher: /You will drop your things and walk away/i,
  entityType: ENTITY_TYPE.EQUIPMENT,
}
export const MICRONOVA = {
  matcher: /uses.*micronova/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}
export const PILLKEEPER_DISINTIGRATE = {
  matcher: /Explodinall/i,
  entityType: ENTITY_TYPE.OTHER,
}
//
export const GALLAPAGOSIAN_MATING_CALL = {
  matcher: /casts.*GALLAPAGOSIAN MATING CALL/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
export const LATTE_ATTRACT = {
  matcher: /casts.*OFFER LATTE TO OPPONENT/i,
  entityType: ENTITY_TYPE.EQUIPMENT,
}
export const TRANSCENDENT_OLFACTION = {
  matcher: /casts.*TRANSCENDENT OLFACTION/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
//
export const POWERFUL_GLOVE_REPLACE = {
  matcher: /casts.*CHEAT CODE: Replace Enemy/i,
  entityType: ENTITY_TYPE.EQUIPMENT,
}
export const TANGLE_OF_RAT_TAILS = {
  matcher: /uses.*tangle of rat tails/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}
export const DAILYAFFIRMATION_ADAPT = {
  matcher: /uses.*Daily Affirmation: Adapt to Change Eventually/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}
export const MACROMETEORITE = {
  matcher: /casts.*Macrometeorite/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
export const CLEESH = {
  matcher: /casts.*CLEESH/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
//
export const POWDERED_MADNESS = {
  matcher: /uses.*powdered madness/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}
export const DOCTORS_BAG_XRAY = {
  matcher: /casts.*Chest X-Ray/i,
  entityType: ENTITY_TYPE.EQUIPMENT,
}
export const IMPLODE_UNIVERSE = {
  matcher: /casts.*Implode Universe/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
//
export const RUNNING_AWAY = {
  matcher: /you.*run away.*like a little coward.*/i,
  entityType: ENTITY_TYPE.COMBAT_SKILL,
}
export const GREEN_SMOKE_BOMB = {
  matcher: /uses.*green smoke bomb/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}
export const TURDS_KEY = {
  matcher: /uses.*T.U.R.D.S. Key/i,
  entityType: ENTITY_TYPE.COMBAT_ITEM,
}