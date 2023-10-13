import React from "react";
// import { v4 as uuidv4 } from 'uuid';

import StarsStackSVG from "../images/stars-stack.svg";

import combineClassnames from "../utilities/combineClassnames";

function StatBlockDisplay(props) {
  const { className, content, label } = props;

  return (
    <div
      className={combineClassnames(
        "overflow-hidden bg-second-darker borradius-2 pad-3 boxsizing-border flex-col-center position-relative",
        className,
      )}
      style={{ width: 60, height: 40 }}
    >
      <div
        className="flex-none adjacent-mar-t-2 position-absolute"
        id="block-inner-icon"
      >
        <img src={StarsStackSVG} style={{ width: 20, height: 20 }} />
      </div>

      <div className="flex-col-center fontsize-4 color-white zindex-1 talign-center flex-none">
        {content}
      </div>

      <div className="fontsize-1 color-white zindex-1 talign-center flex-none">
        {label}
      </div>
    </div>
  );
}
export default function StatChangesDisplay(props) {
  const { className, entry } = props;

  return (
    <div
      className={combineClassnames(
        "flex-row flexwrap-yes adjacent-mar-t-2",
        className,
      )}
    >
      <StatBlockDisplay
        content={entry.musSubstats}
        label="mus exp"
        className={combineClassnames(
          "mar-1",
          entry.attributes.isMusUp ? "f-bold" : "",
        )}
      />

      <StatBlockDisplay
        content={entry.mystSubstats}
        label="myst exp"
        className={combineClassnames(
          "mar-1",
          entry.attributes.isMusUp ? "f-bold" : "",
        )}
      />

      <StatBlockDisplay
        content={entry.moxSubstats}
        label="mox exp"
        className={combineClassnames(
          "mar-1",
          entry.attributes.isMusUp ? "f-bold" : "",
        )}
      />
    </div>
  );
}
