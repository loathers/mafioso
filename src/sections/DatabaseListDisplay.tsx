import { observer } from "mobx-react";

import DATABASE_ENTRY_STATUS from "../constants/DATABASE_ENTRY_STATUSES";

import ActiveSVG from "../images/eye.svg";
import StandardSVG from "../images/calendar.svg";
import InactiveSVG from "../images/eye-off.svg";
import DeleteSVG from "../images/trash-can.svg";

import ChallengePathIcon from "../components/ChallengePathIcon";

import combineClassnames from "../utilities/combineClassnames";
import { RunLog } from "../store/databaseStore";

type Props = {
  currentList: RunLog[];
  hasEditOptions: boolean;
  onClickView: (entry: RunLog) => void;
  onClickStatusToggle: (entry: RunLog) => void;
  onClickDelete: (entry: RunLog) => void;
  className?: string;
  searchTerm: string;
};

export default observer(function DatabaseListDisplay({
  currentList,
  hasEditOptions,
  onClickView,
  onClickStatusToggle,
  onClickDelete,
  className,
  searchTerm,
}: Props) {
  const searchFilteredList = currentList.filter((item) => {
    if (searchTerm === "") return true;

    const charString = item.characterName.toLowerCase();
    const pathString = item.pathName.toLowerCase();
    return charString.includes(searchTerm) || pathString.includes(searchTerm);
  });

  return (
    <div
      id="app-section-database-list"
      className={combineClassnames("fontsize-4 flex-col", className)}
    >
      {searchFilteredList.map((rowData, idx) => (
        <DatabaseRow
          hasEditOptions={hasEditOptions}
          onClickView={onClickView}
          onClickStatusToggle={onClickStatusToggle}
          onClickDelete={onClickDelete}
          key={`database-list-row-${idx}-key`}
          data={rowData}
        />
      ))}

      {searchFilteredList.length <= 0 && (
        <div className="flex-row-center fontsize-6 color-white flex-auto adjacent-mar-t-5">
          Couldn't find anything with these filters.
        </div>
      )}
    </div>
  );
});

type DatabaseRowProps = {
  data: RunLog;
  hasEditOptions: boolean;
  onClickView: (entry: RunLog) => void;
  onClickStatusToggle: (entry: RunLog) => void;
  onClickDelete: (entry: RunLog) => void;
};

function DatabaseRow({
  data,
  onClickView,
  onClickStatusToggle,
  onClickDelete,
  hasEditOptions,
}: DatabaseRowProps) {
  const isActive = data.status === DATABASE_ENTRY_STATUS.ACTIVE;

  return (
    <div className="borradius-2 flex-row aitems-center jcontent-start adjacent-mar-t-1">
      <RowDisplay
        onClick={() => onClickView(data)}
        data={data}
        className="bg-second pad-3 adjacent-mar-l-4"
      />

      {hasEditOptions && (
        <div className="flex-row adjacent-mar-l-4">
          <RowButton
            onClick={() => onClickStatusToggle(data)}
            className="color-gray fontsize-3 pad-v-3 pad-h-4 flex-row-center adjacent-mar-l-4"
          >
            {isActive && (
              <img
                src={ActiveSVG}
                className="flex-none adjacent-mar-l-4"
                style={{ width: 14, height: 14 }}
              />
            )}

            {!isActive && (
              <img
                src={InactiveSVG}
                className="flex-none adjacent-mar-l-4"
                style={{ width: 14, height: 14 }}
              />
            )}
          </RowButton>

          <RowButton
            onClick={() => onClickDelete(data)}
            className="color-gray fontsize-3 pad-v-3 pad-h-4 flex-row-center adjacent-mar-l-4"
          >
            <img
              src={DeleteSVG}
              className="flex-none adjacent-mar-l-4"
              style={{ width: 14, height: 14, opacity: 0.7 }}
            />
          </RowButton>
        </div>
      )}
    </div>
  );
}

type RowButtonProps = {
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function RowButton({ className, disabled, ...otherProps }: RowButtonProps) {
  const borderClassName = disabled
    ? "bor-2-second-darkest"
    : "bor-2-second-darker";
  const colorClassName = disabled ? "color-grayer" : "color-white";
  const pointerClassName = disabled ? "" : "cursor-pointer";

  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={combineClassnames(
        "borradius-2 bg-second hover:bg-second-lighter",
        borderClassName,
        colorClassName,
        pointerClassName,
        className,
      )}
    />
  );
}

type RowDisplayProps = {
  onClick: () => void;
  className?: string;
  data: RunLog;
};

function RowDisplay({
  onClick,
  className,
  data: {
    characterName,
    pathName,
    difficultyName,
    dayCount,
    turnCount,
    standardSeason,
  },
}: RowDisplayProps) {
  const hasStandardSeason = standardSeason && standardSeason !== "Unrestricted";

  return (
    <RowButton
      onClick={onClick}
      className={combineClassnames(
        "borradius-2 bg-second hover:bg-second-lighter pad-2 flex-row flex-auto adjacent-mar-t-1",
        className,
      )}
    >
      <ChallengePathIcon
        pathName={pathName}
        className="flex-none mar-r-3 adjacent-mar-l-2"
        style={{ width: 14, height: 14, opacity: 0.7 }}
      />

      <span className="f-bold adjacent-mar-l-2">{characterName}</span>
      <span className="adjacent-mar-l-2">in</span>
      <span className="f-bold adjacent-mar-l-2">{`${difficultyName} ${pathName}`}</span>

      {hasStandardSeason && (
        <img
          src={StandardSVG}
          className="talign-right adjacent-mar-l-2"
          style={{ width: 14, height: 14 }}
        />
      )}

      <span className="color-gray flex-auto talign-right adjacent-mar-l-2">{`(${dayCount} days / ${turnCount} turns)`}</span>
    </RowButton>
  );
}
