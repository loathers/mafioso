import React from "react";

import UncertaintySVG from "../images/uncertainty.svg";

import combineClassnames from "../utilities/combineClassnames";

export default function SingleDisplay(props) {
  const { className, style, content, icon = UncertaintySVG } = props;

  return (
    <div
      style={style}
      className={combineClassnames(
        "mar-1 pad-v-2 pad-h-3 overflow-hidden bg-second-darker borradius-2 flex-row aitems-center flexwrap-yes position-relative",
        className,
      )}
    >
      <img
        src={icon}
        id="block-inner-icon"
        style={{ width: 20, height: 20, opacity: 0.7 }}
        className="flex-none adjacent-mar-l-2"
      />

      <div className="fontsize-2 flex-none adjacent-mar-l-2">{content}</div>
    </div>
  );
}
