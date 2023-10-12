import React from "react";

import combineClassnames from "../utilities/combineClassnames";

/**  @returns {React.Component} */
export default function EntryHeaderDisplay(props) {
  const { className, topContent, bottomContent, subContent } = props;

  return (
    <div
      className={combineClassnames(
        "fontfamily-secondary flex-col-center",
        className,
      )}
    >
      <div style={{ fontSize: 17 }} className="f-italic flex-none">
        {topContent}
      </div>
      <div style={{ fontSize: 25 }} className="f-bold f-italic flex-none">
        {bottomContent}
      </div>
      {subContent && (
        <div
          style={{ fontSize: 14 }}
          className="flex-none"
        >{`(${subContent})`}</div>
      )}
    </div>
  );
}
