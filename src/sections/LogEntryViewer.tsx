import { Fragment } from "react";
import { observer } from "mobx-react";

import appStore from "../store/appStore";

import EntryDisplayContainer from "../components/EntryDisplayContainer";
import EntryHeaderDisplay from "../components/EntryHeaderDisplay";

import combineClassnames from "../utilities/combineClassnames";
import Entry from "../classes/Entry";

type Props = {
  className?: string;
  entriesList?: Entry[];
  voterMonsters?: string[];
};

export default observer(function LogEntryViewer({
  className,
  entriesList = [],
  voterMonsters = [],
}: Props) {
  return (
    <div
      className={combineClassnames(
        "width-full flex-col adjacent-mar-t-5",
        className,
      )}
    >
      {entriesList.map((entry, idx) => {
        const currentDay = entry.attributes.dayNum;
        const previousDay = entriesList[idx - 1]?.attributes.dayNum;
        const shouldShowDayDisplay =
          previousDay !== undefined ? previousDay < currentDay : false;

        return (
          <Fragment key={`entry-display-${entry.id}-${idx}-key`}>
            {shouldShowDayDisplay && (
              <EntryHeaderDisplay
                topContent={`Day ${currentDay}`}
                subContent={voterMonsters[currentDay - 1]}
                className="pad-3 adjacent-mar-t-1"
              />
            )}

            <EntryDisplayContainer
              entry={entry}
              isDefaultCompact={appStore.isUsingCompactMode.get()}
              isDevMode={appStore.isDevMode.get()}
              className="visualizer-cell adjacent-mar-t-1"
            />
          </Fragment>
        );
      })}
    </div>
  );
});
