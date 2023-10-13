import React from "react";
import { v4 as uuidv4 } from "uuid";

import SteakSVG from "../images/steak.svg";
import SwapBagSVG from "../images/swap-bag.svg";

import ItemDisplay from "./ItemDisplay";

import combineClassnames from "../utilities/combineClassnames";

export default function ItemChangesDisplay(props) {
  const { className, entry } = props;

  const { attributes } = entry;
  const { acquiredItems } = attributes;

  return (
    <div
      className={combineClassnames(
        "flex-row flexwrap-yes adjacent-mar-t-3",
        className,
      )}
    >
      {entry.hasMeatChanges && (
        <ItemDisplay
          icon={SteakSVG}
          className="mar-2"
          content={`${entry.createMeatDisplay()} meat`}
        />
      )}

      {acquiredItems.map((itemName, idx) => (
        <ItemDisplay
          icon={SwapBagSVG}
          className="mar-2"
          content={`${itemName}`}
          key={`acquired-item-${uuidv4()}-${idx}-key`}
        />
      ))}
    </div>
  );
}
