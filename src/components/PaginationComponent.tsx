import React from "react";

import DarkButton from "./DarkButton";

import combineClassnames from "../utilities/combineClassnames";

const MAX_PAGINATION_SIZE = 7;

type Props = {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  disabled?: boolean;
  currNum: number | "all";
  lastNum: number;
  onChangePage: (page: number) => void;
};

export default function SimplePaginator({
  className,
  style,
  label,
  disabled,
  currNum,
  lastNum,
  onChangePage,
}: Props) {
  const pageNumAvailable = calculateAvailablePages(currNum, lastNum);

  return (
    <div
      style={style}
      id="pagination-menu"
      className={combineClassnames(
        "boxshadow-dark fontfamily-primary fontsize-6 pad-2 flex-row-center",
        className,
      )}
    >
      {label && (
        <div className="fontsize-2 pad-h-3 flex-none adjacent-mar-l-3">
          {label}
        </div>
      )}

      {pageNumAvailable.map((num, idx) => {
        const isDivider = num === "...";
        const displayNum = isDivider ? "..." : num + 1;
        const isOnThisNum = currNum === num;
        return (
          <DarkButton
            key={`page-num-${idx}-key`}
            onClick={isDivider ? undefined : () => onChangePage(num)}
            disabled={isDivider || disabled}
            children={displayNum}
            style={{ width: 40 }}
            className={combineClassnames(
              "adjacent-mar-l-3",
              isOnThisNum ? "active" : "",
            )}
          />
        );
      })}

      {pageNumAvailable.length <= 0 && (
        <div className="pad-h-6 color-gray">...</div>
      )}
    </div>
  );
}
/**
 * there's gotta be a smarter way to have done this
 * pretty sure I have no idea wtf I wrote
 */
function calculateAvailablePages(curr: number | "all", last: number) {
  let pageNumList: ("..." | number)[] = [0]; // always include first
  if (curr === "all" || (curr === 0 && last === 0)) {
    return pageNumList;
  }

  let unallocatedAmt = MAX_PAGINATION_SIZE;
  const HALF_SIZE = Math.round(MAX_PAGINATION_SIZE / 2);
  const willNeedStartEllipses =
    last - 2 > MAX_PAGINATION_SIZE && curr > HALF_SIZE + 1;
  const willNeedEndEllipses =
    last - 2 > MAX_PAGINATION_SIZE && curr < last - HALF_SIZE - 1;

  // need start ellipses
  if (willNeedStartEllipses) {
    pageNumList.push("...");
    unallocatedAmt -= 1;
  }

  // end ellipsis
  if (willNeedEndEllipses) {
    unallocatedAmt -= 1;
  }

  const shouldStartHigh = curr > last / 2;
  if (shouldStartHigh) {
    const possibleEnd = Math.round(curr + unallocatedAmt / 2);
    const endNum = Math.min(possibleEnd, last - 1);
    unallocatedAmt -= endNum - curr;
    const startNum = Math.max(curr - unallocatedAmt, 1);

    for (let k = startNum; k <= endNum; k++) {
      pageNumList.push(k);
    }
  } else {
    const possibleStart = Math.round(curr - unallocatedAmt / 2) - 1;
    const startNum = Math.max(possibleStart, 1);
    unallocatedAmt -= curr - startNum;
    const endNum = Math.min(curr + unallocatedAmt, last - 1);

    for (let k = startNum; k <= endNum; k++) {
      pageNumList.push(k);
    }
  }

  if (willNeedEndEllipses) {
    pageNumList.push("...");
  }

  // always include last
  pageNumList.push(last);

  // done
  return pageNumList;
}
