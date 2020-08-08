import ENTITY_TYPE from 'constants/ENTITY_TYPE';

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