import React from 'react';

import {ReactComponent as AscendSVG} from 'images/holy-grail.svg';
import {ReactComponent as CraftSVG} from 'images/anvil.svg';
import {ReactComponent as CombatSVG} from 'images/crossed-swords.svg';
import {ReactComponent as DrinkSVG} from 'images/martini.svg';
import {ReactComponent as EatSVG} from 'images/meal.svg';
import {ReactComponent as EquipmentSVG} from 'images/battle-gear.svg';
import {ReactComponent as FamiliarSVG} from 'images/cat.svg';
import {ReactComponent as InfoSVG} from 'images/info.svg';
import {ReactComponent as ItemBagSVG} from 'images/swap-bag.svg';
import {ReactComponent as LevelUpSVG} from 'images/star-formation.svg';
import {ReactComponent as MafiosoSVG} from 'images/gun-rose.svg';
import {ReactComponent as NoncombatSVG} from 'images/dig-dug.svg';
import {ReactComponent as OptionsSVG} from 'images/freemasonry.svg';
import {ReactComponent as PathSVG} from 'images/flag-objective.svg';
import {ReactComponent as ShopSVG} from 'images/shop.svg';
import {ReactComponent as SpellsSVG} from 'images/spell-book.svg';
import {ReactComponent as SpleenSVG} from 'images/pill.svg';
import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

/**
 * @param {String} str
 * @returns {React.Component}
 */
function getComponentFromString(str) {
  switch (str) {
    case 'AscendSVG':
      return AscendSVG;
    case 'CraftSVG':
      return CraftSVG;
    case 'CombatSVG':
      return CombatSVG;
    case 'DrinkSVG':
      return DrinkSVG;
    case 'EatSVG':
      return EatSVG;
    case 'EquipmentSVG':
      return EquipmentSVG;
    case 'FamiliarSVG':
      return FamiliarSVG;
    case 'InfoSVG':
      return InfoSVG;
    case 'ItemBagSVG':
      return ItemBagSVG;
    case 'LevelUpSVG':
      return LevelUpSVG;
    case 'MafiosoSVG':
      return MafiosoSVG;
    case 'NoncombatSVG':
      return NoncombatSVG;
    case 'OptionsSVG':
      return OptionsSVG;
    case 'PathSVG':
      return PathSVG;
    case 'ShopSVG':
      return ShopSVG;
    case 'SpellsSVG':
      return SpellsSVG;
    case 'SpleenSVG':
      return SpleenSVG;
    case 'UnknownSVG':
    default:
      return UnknownSVG;
  }
}

/**
 * @returns {React.Component}
 */
export default function EntryTypeIcon(props) {
  const {
    entry,
  } = props;

  let EntryIconComponent = entry.entryIcon;
  if (typeof entry.entryIcon === 'string') {
    EntryIconComponent = getComponentFromString(entry.entryIcon);
  }

  return (
    <EntryIconComponent
      entry={entry}
      className='flex-none adjacent-mar-t-2'
      style={{
        width: 25,
        height: 25,
        opacity: 0.7,
      }} />
  )
}
