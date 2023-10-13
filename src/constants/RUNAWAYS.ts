import ENTITY_TYPE from "./ENTITY_TYPE";

/**
 * https://kol.coldfront.net/thekolwiki/index.php/Insta-kill
 *
 * @todo Unleash Nanites, Frumious Bandersnatch, Greatest American Pants, navel ring of navel gazing,
 *  Pair of Stomping Boots, Summon Mayfly Swarm
 *
 */
export const RUNAWAYS = {
  "Run Away": {
    matcher: /you.*run away.*like a little coward.*/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "Stomping Boots Runaway": {
    matcher: /.*kicks you in the butt to speed your escape.*/i,
    entityType: ENTITY_TYPE.FAMILIAR,
  },
  Return: {
    matcher: /(uses|casts).*Return!/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "green smoke bomb": {
    matcher: /(uses|casts).*green smoke bomb/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "T.U.R.D.S. Key": {
    matcher: /(uses|casts).*T.U.R.D.S. Key/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "Baleful Howl": {
    matcher: /(uses|casts).*Baleful Howl/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  "wumpus-hair bolo": {
    matcher: /(uses|casts).*wumpus-hair bolo/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "bargain flash powder": {
    matcher: /(uses|casts).*bargain flash powder/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  buckyball: {
    matcher: /(uses|casts).*buckyball/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  "fish-oil smoke bomb": {
    matcher: /(uses|casts).*fish-oil smoke bomb/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  // -- doubles as banisher
  // 'Curse of Vacation': {
  //   matcher: /(uses|casts).*Curse of Vacation/i,
  //   entityType: ENTITY_TYPE.COMBAT_SKILL,
  // },
  // 'Creepy Grin': {
  //   matcher: /(uses|casts).*Creepy Grin/i,
  //   entityType: ENTITY_TYPE.COMBAT_SKILL,
  // },
  // 'divine champagne popper': {
  //   matcher: /(uses|casts).*divine champagne popper/i,
  //   entityType: ENTITY_TYPE.COMBAT_SKILL,
  // },
  // 'crystal skull': {
  //   matcher: /(uses|casts).*crystal skull/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Ensorcel': {
  //   matcher: /(uses|casts).*Ensorcel/i,
  //   entityType: ENTITY_TYPE.COMBAT_SKILL,
  // },
  // 'giant eraser': {
  //   matcher: /(uses|casts).*giant eraser/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'glob of Blank-Out': {
  //   matcher: /(uses|casts).*glob of Blank-Out/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Give Your Opponent the Stinkeye': {
  //   matcher: /(uses|casts).*Give Your Opponent the Stinkeye/i,
  //   entityType: ENTITY_TYPE.EQUIPMENT,
  // },
  // 'Harold\'s bell': {
  //   matcher: /(uses|casts).*Harold's bell/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Louder Than Bomb': {
  //   matcher: /(uses|casts).*Louder Than Bomb/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Tennis ball': {
  //   matcher: /(uses|casts).*Tennis ball/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Mer-kin pinkslip': {
  //   matcher: /(uses|casts).*Mer-kin pinkslip/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'peppermint parasol': {
  //   matcher: /(uses|casts).*peppermint parasol/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'GOTO': {
  //   matcher: /(uses|casts).*GOTO/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'golden plastic oyster egg': {
  //   matcher: /(uses|casts).*golden plastic oyster egg/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // 'Snokebomb': {
  //   matcher: /(uses|casts).*Snokebomb/i,
  //   entityType: ENTITY_TYPE.COMBAT_SKILL,
  // },
  // 'Throw Latte on Opponent': {
  //   matcher: /(uses|casts).*Throw Latte on Opponent/i,
  //   entityType: ENTITY_TYPE.EQUIPMENT,
  // },
  // 'Winifred\'s whistle': {
  //   matcher: /(uses|casts).*Winifred's whistle/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  // -- specific banishers
  "short writ of habeas corpus": {
    matcher: /(uses|casts).*short writ of habeas corpus/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  // 'cocktail napkin': {
  //   matcher: /(uses|casts).*cocktail napkin/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
  windicle: {
    matcher: /(uses|casts).*windicle/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  // -- better be careful of this one
  // 'ball': {
  //   matcher: /(uses|casts).*ball/i,
  //   entityType: ENTITY_TYPE.COMBAT_ITEM,
  // },
};
