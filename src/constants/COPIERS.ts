import ENTITY_TYPE from "./ENTITY_TYPE";

export const COPIERS = {
  Digitize: {
    matcher: /(uses|casts).*DIGITIZE/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Lecture on Relativity": {
    matcher: /(uses|casts).*LECTURE ON RELATIVITY/i,
    entityType: ENTITY_TYPE.FAMILIAR,
  },
  "Cosplay Saber Friends": {
    matcher: /You will go find two friends and meet me here/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  "4-d Camera": {
    matcher: /(uses|casts).*4-d camera/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Spooky Putty Sheet": {
    matcher: /(uses|casts).*Spooky Putty sheet/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Rain-Doh black box": {
    matcher: /(uses|casts).*Rain-Doh black box/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Badly Romantic Arrow": {
    matcher: /(uses|casts).*BADLY ROMANTIC ARROW/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Wink At": {
    matcher: /WINK AT/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Print Screen Button": {
    matcher: /(uses|casts).*print screen button/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "LOV Enamorang": {
    matcher: /(uses|casts).*LOV Enamorang/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
} as const;
