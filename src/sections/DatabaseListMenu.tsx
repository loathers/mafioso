import { useState } from "react";
import { observer } from "mobx-react";

import {
  DIFFICULTY_FILTERS,
  PATH_FILTERS,
} from "../constants/DATABASE_FILTERS";

import databaseStore from "../store/databaseStore";
import sessionStore from "../store/sessionStore";

import Button from "../components/Button";
import FiltersMenu, { FilterInput } from "./FiltersMenu";
import SelectOptionsComponent from "../components/SelectOptionsComponent";

import combineClassnames from "../utilities/combineClassnames";

export type Option = {
  label: string;
  isHidden?: boolean;
  isDisabled?: boolean;
  checked?: boolean;
  title?: string;
  attributeName?: string;
};

export type Filter = {
  id?: string;
  optionGroup?: Option[];
} & Option;

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default observer(function LogVisualizerMenu({
  className,
  style,
}: Props) {
  const [menuOptions, updateMenuOptions] = useState({
    searchTerm: "",
    isShowStandardOnly: databaseStore.isShowStandardOnly,
    difficultyName: databaseStore.filterOptions.difficultyName,
    pathName: databaseStore.filterOptions.pathName,
  });

  // update checked state now that difficulty is cached in localStorage
  const formattedDifficultyList = DIFFICULTY_FILTERS.map((item) => {
    item.checked = item.label === menuOptions.difficultyName;
    return item;
  });

  const onChangeIsShowStandardOnly = (newValue: boolean) => {
    const newOptions = { ...menuOptions, isShowStandardOnly: newValue };
    updateMenuOptions(newOptions);
    databaseStore.isShowStandardOnly = newValue;
    databaseStore.filterList(newOptions);
    sessionStore.set("isShowStandardOnly", newValue);
  };

  const onChangeDifficultyList = (newList: Filter[]) => {
    const selectedOption = newList.find((option) => option.checked);
    const newDifficulty = (selectedOption && selectedOption.label) || "Any";
    const newOptions = { ...menuOptions, difficultyName: newDifficulty };
    updateMenuOptions(newOptions);
    sessionStore.set("difficultyNameFilter", newDifficulty);
    databaseStore.filterList(newOptions);
  };

  const updateSelectedPath = (newPath: string) => {
    const newOptions = { ...menuOptions, pathName: newPath };
    updateMenuOptions(newOptions);
    sessionStore.set("pathNameFilter", newPath);
    databaseStore.filterList(newOptions);
  };

  const updateSearchTerm = (newValue: string) => {
    const newOptions = { ...menuOptions, searchTerm: newValue };
    databaseStore.searchTermFilter.set(newValue);
    updateMenuOptions(newOptions);
  };

  return (
    <div
      id="app-side-menu"
      style={style}
      className={combineClassnames("flex-col", className)}
    >
      <div className={combineClassnames("flex-col flex-none adjacent-mar-t-5")}>
        <div className="flex-none fontsize-3 adjacent-mar-t-3">Filters</div>

        <input
          value={menuOptions.searchTerm}
          onChange={(evt) => updateSearchTerm(evt.target.value)}
          placeholder="Filter by text..."
          className="bg-white color-first borradius-1 pad-2 adjacent-mar-t-3"
        />

        <FilterInput
          appDisabled={!databaseStore.isReady}
          onChange={(evt) =>
            onChangeIsShowStandardOnly(evt.currentTarget.checked)
          }
          optionData={{
            label: "Standard Only",
            checked: menuOptions.isShowStandardOnly,
          }}
          type="checkbox"
          className="adjacent-mar-t-3"
        />
      </div>

      {/* filter by Difficulty */}
      <FiltersMenu
        label="Difficulty"
        disabled={!databaseStore.isReady}
        defaultList={formattedDifficultyList}
        onChange={onChangeDifficultyList}
        inputType="radio"
        className="adjacent-mar-t-5"
      />

      {/* filter by Path */}
      <div className="flex-col flex-none adjacent-mar-t-5">
        <SelectOptionsComponent
          label="Path"
          onChange={(evt) => updateSelectedPath(evt.currentTarget.value)}
          selected={menuOptions.pathName}
          list={PATH_FILTERS}
          size={10}
          disabled={!databaseStore.isReady}
          id="difficulty-filter-selector"
          className="flex-none adjacent-mar-t-2"
        />

        <Button
          disabled={!databaseStore.isReady}
          onClick={() => updateSelectedPath("Any")}
          className="borradius-1 fontsize-3 pad-3 adjacent-mar-t-2"
        >
          Clear
        </Button>
      </div>
    </div>
  );
});
