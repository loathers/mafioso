import React from "react";

import AscendSVG from "../images/holy-grail.svg";
import CraftSVG from "../images/anvil.svg";
import CombatSVG from "../images/crossed-swords.svg";
import DrinkSVG from "../images/martini.svg";
import EatSVG from "../images/meal.svg";
import EquipmentSVG from "../images/battle-gear.svg";
import FamiliarSVG from "../images/cat.svg";
import InfoSVG from "../images/info.svg";
import ItemBagSVG from "../images/swap-bag.svg";
import LevelUpSVG from "../images/star-formation.svg";
import MafiosoSVG from "../images/gun-rose.svg";
import NoncombatSVG from "../images/dig-dug.svg";
import OptionsSVG from "../images/freemasonry.svg";
import PathSVG from "../images/flag-objective.svg";
import ShopSVG from "../images/shop.svg";
import SpellsSVG from "../images/spell-book.svg";
import SpleenSVG from "../images/pill.svg";
import UnknownSVG from "../images/uncertainty.svg";
import UROBOTicon from "../images/UROBOT-icon.svg";

/**
 * @param {String} str
 * @returns {React.Component}
 */
function getIconFromString(str) {
  switch (str) {
    case "AscendSVG":
      return AscendSVG;
    case "CraftSVG":
      return CraftSVG;
    case "CombatSVG":
      return CombatSVG;
    case "DrinkSVG":
      return DrinkSVG;
    case "EatSVG":
      return EatSVG;
    case "EquipmentSVG":
      return EquipmentSVG;
    case "FamiliarSVG":
      return FamiliarSVG;
    case "InfoSVG":
      return InfoSVG;
    case "ItemBagSVG":
      return ItemBagSVG;
    case "LevelUpSVG":
      return LevelUpSVG;
    case "MafiosoSVG":
      return MafiosoSVG;
    case "NoncombatSVG":
      return NoncombatSVG;
    case "OptionsSVG":
      return OptionsSVG;
    case "PathSVG":
      return PathSVG;
    case "ShopSVG":
      return ShopSVG;
    case "SpellsSVG":
      return SpellsSVG;
    case "SpleenSVG":
      return SpleenSVG;
    case "UROBOTicon":
      return UROBOTicon;
    case "UnknownSVG":
    default:
      return UnknownSVG;
  }
}

/**
 * @returns {React.Component}
 */
export default function EntryTypeIcon(props) {
  const { entry } = props;

  let entryIcon = entry.entryIcon;
  if (typeof entry.entryIcon === "string") {
    entryIcon = getIconFromString(entry.entryIcon);
  }

  return (
    <img
      src={entryIcon}
      entry={entry}
      className="flex-none adjacent-mar-t-2"
      style={{
        width: 25,
        height: 25,
        opacity: 0.7,
      }}
    />
  );
}
