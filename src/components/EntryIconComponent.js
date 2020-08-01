import React from 'react';

import ENTRY_TYPE from 'constants/entryType';

import { ReactComponent as AnvilImpactSVG } from 'images/anvil-impact.svg';
import { ReactComponent as BattleGearSVG } from 'images/battle-gear.svg';
import { ReactComponent as CatSVG } from 'images/cat.svg';
import { ReactComponent as CrossedSwordsSVG } from 'images/crossed-swords.svg';
import { ReactComponent as CondorEmblemSVG } from 'images/condor-emblem.svg';
import { ReactComponent as DigDugSVG } from 'images/dig-dug.svg';
import { ReactComponent as InfoSVG } from 'images/info.svg';
import { ReactComponent as ShopSVG } from 'images/shop.svg';
// import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SpellbookSVG } from 'images/spell-book.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';
import { ReactComponent as MartiniSVG } from 'images/martini.svg';
import { ReactComponent as PotionSVG } from 'images/potion-ball.svg';
import { ReactComponent as MealSVG } from 'images/meal.svg';
import { ReactComponent as PillSVG } from 'images/pill.svg';
import { ReactComponent as UncertaintySVG } from 'images/uncertainty.svg';

// import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {EntryType} entryType
 * @returns {React.Component}
 */
function getEntryIcon(entryType) {
  switch(entryType) {
    // case ENTRY_TYPE.SNAPSHOT.NEW_DAY:
    case ENTRY_TYPE.SNAPSHOT.DAY_INFO:
    case ENTRY_TYPE.SNAPSHOT.VALHALLA:
      return CondorEmblemSVG;

    case ENTRY_TYPE.PVP:
    case ENTRY_TYPE.IOTM.GOD_LOBSTER.COMBAT:
    case ENTRY_TYPE.ENCOUNTER.COMBAT:
      return CrossedSwordsSVG;

    case ENTRY_TYPE.IOTM.BEACH_COMB:
    case ENTRY_TYPE.IOTM.BASTILLE_BATALLION:
    case ENTRY_TYPE.IOTM.DISTANT_WOODS_GETAWAY:
    case ENTRY_TYPE.TALKING:
    case ENTRY_TYPE.VISITING:
    case ENTRY_TYPE.ENCOUNTER.NONCOMBAT:
      return DigDugSVG;
      
    case ENTRY_TYPE.SNAPSHOT.CHARACTER_INFO:
    case ENTRY_TYPE.SNAPSHOT.SKILL_BREAKDOWN:
    case ENTRY_TYPE.SNAPSHOT.ASCENSION_INFO:
    case ENTRY_TYPE.IOTM.BOXING_DAYCARE:
    case ENTRY_TYPE.IOTM.DECK_OF_EVERY_CARD:
    case ENTRY_TYPE.IOTM.GOD_LOBSTER.BOON:
    case ENTRY_TYPE.IOTM.SONGBOOM_BOOMBOX:
    case ENTRY_TYPE.IOTM.VOTING_BOOTH:
    case ENTRY_TYPE.CLAN_VISIT:
      return InfoSVG;

    case ENTRY_TYPE.IOTM.GARBAGE_TOTE:
    case ENTRY_TYPE.ITEMS.EQUIP:
    case ENTRY_TYPE.ITEMS.UNEQUIP:
      return BattleGearSVG;

    case ENTRY_TYPE.ITEMS.HAGNK_PULL:
    case ENTRY_TYPE.ITEMS.CLOSET_PUT:
    case ENTRY_TYPE.ITEMS.CLOSET_TAKE:
      return SwapBagSVG;

    case ENTRY_TYPE.ITEMS.COMBINE:
    case ENTRY_TYPE.ITEMS.COOK:
    case ENTRY_TYPE.ITEMS.CRAFT:
    case ENTRY_TYPE.ITEMS.CREATE:
    case ENTRY_TYPE.ITEMS.MIX:
      return AnvilImpactSVG;

    case ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.MAKE:
    case ENTRY_TYPE.IOTM.DIABOLIC_PIZZA.EAT:
    case ENTRY_TYPE.CONSUMPTION.EAT:
      return MealSVG;

    case ENTRY_TYPE.CONSUMPTION.DRINK:
      return MartiniSVG;

    case ENTRY_TYPE.IOTM.PILLKEEPER:
    case ENTRY_TYPE.CONSUMPTION.CHEW:
      return PillSVG;

    case ENTRY_TYPE.POTION:
      return PotionSVG;

    case ENTRY_TYPE.IOTM.CAT_BURGLAR:
    case ENTRY_TYPE.FAMILIAR:
      return CatSVG;

    case ENTRY_TYPE.EFFECTS.SPELL_CAST:
      return SpellbookSVG;

    case ENTRY_TYPE.TRANSACTION:
      return ShopSVG;

    case ENTRY_TYPE.UNKNOWN:
    default:
      return UncertaintySVG;
  }
}
/**
 * @returns {React.Component}
 */
export default function EntryIconComponent(props) {
  const {
    entry,
    ...otherProps
  } = props;

  const EntryIconComponent = getEntryIcon(entry.entryType);

  return (
    <EntryIconComponent {...otherProps} />
  )
}