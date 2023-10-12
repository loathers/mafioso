import React from "react";
import { v4 as uuidv4 } from "uuid";

import UncertaintySVG from "../images/uncertainty.svg";

import combineClassnames from "../utilities/combineClassnames";

/** @returns {React.Component} */
export default function ListDisplay(props) {
  const { className, style, list, icon = UncertaintySVG } = props;

  return (
    <div
      style={style}
      className={combineClassnames(
        "mar-1 pad-2 overflow-hidden bg-second-darker borradius-2 flex-row flexwrap-yes position-relative",
        className,
      )}
    >
      <img
        src={icon}
        elementname="block-inner-icon"
        style={{ width: 20, height: 20, opacity: 0.7 }}
        className="flex-none adjacent-mar-l-2"
      />

      <div className="flex-col flex-auto jcontent-center adjacent-mar-l-2">
        {list.map((listItem, idx) => (
          <PairedDisplay
            leftContent={listItem.displayName}
            rightContent={listItem.displayAmount}
            className="adjacent-mar-t-2"
            key={`acquired-effect-${uuidv4()}-${idx}-key`}
          />
        ))}
      </div>
    </div>
  );
}
/** @returns {React.Component} */
export function PairedDisplay(props) {
  const { className, leftContent, rightContent } = props;

  return (
    <div
      className={combineClassnames("mar-1 flex-row flexwrap-yes", className)}
    >
      {leftContent && (
        <div className="fontsize-2 flex-none adjacent-mar-l-2">
          {leftContent}
        </div>
      )}

      {rightContent && (
        <div className="fontsize-2 flex-none adjacent-mar-l-2">
          {rightContent}
        </div>
      )}
    </div>
  );
}
