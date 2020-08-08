import ENTITY_TYPE from 'constants/ENTITY_TYPE';

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