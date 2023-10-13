import React from "react";
import { observer } from "mobx-react";

import {
  ENTRY_TYPE_FILTERS,
  ATTRIBUTE_FILTERS,
  Filter,
} from "../constants/filterList";

import appStore from "../store/appStore";
import logStore from "../store/logStore";

import Button from "../components/Button";
import SelectOptionsComponent from "../components/SelectOptionsComponent";

import FiltersMenu from "./FiltersMenu";

import combineClassnames from "../utilities/combineClassnames";

type Props = {
  className?: string;
  style: React.CSSProperties;
};

export default observer(function LogVisualizerMenu({
  className,
  style,
}: Props) {
  // visible entries
  const [categoriesVisibleList, updateVisibleList] =
    React.useState(ENTRY_TYPE_FILTERS);

  const onChangeVisibleEntries = (list: Filter[]) => {
    updateVisibleList(list);
  };

  const onApplyEntries = (list: Filter[]) => {
    const checkedItems = list.reduce<string[]>((checkedCategories, item) => {
      if (!item.checked) return checkedCategories;

      return checkedCategories.concat(item.categories ?? []);
    }, []);

    logStore.fetchEntries({ categoriesVisible: checkedItems });
    appStore.shouldScrollUp.set(true);
  };

  // attribute filters
  const [selectedAttribute, updateSelectedAttribute] = React.useState("");

  const onSelectAttributeFilter = (attributeName: string) => {
    if (attributeName === "none") {
      updateSelectedAttribute("");
      logStore.fetchEntries({ filteredAttributes: [] });
      appStore.shouldScrollUp.set(true);
    } else {
      updateSelectedAttribute(attributeName);
      logStore.fetchEntries({
        filteredAttributes: [{ attributeName, attributeValue: true }],
      });
      appStore.shouldScrollUp.set(true);
    }
  };

  return (
    <div
      id="app-side-menu"
      style={style}
      className={combineClassnames("flex-col", className)}
    >
      {/* change visible entries */}
      <div className="flex-col flex-none adjacent-mar-t-5">
        <FiltersMenu
          label="Visible Categories"
          disabled={!appStore.isReady}
          defaultList={categoriesVisibleList}
          onChange={onChangeVisibleEntries}
          inputType="checkbox"
          className="adjacent-mar-t-2"
        />

        <Button
          onClick={() => onApplyEntries(categoriesVisibleList)}
          disabled={!appStore.isReady}
          className="borradius-1 fontsize-3 pad-3 adjacent-mar-t-2"
        >
          Apply
        </Button>
      </div>

      {/* filter by attribute */}
      <div className="flex-col flex-none adjacent-mar-t-5">
        <SelectOptionsComponent
          label="Filter by Attributes"
          onChange={(evt) => onSelectAttributeFilter(evt.currentTarget.value)}
          selected={selectedAttribute}
          list={ATTRIBUTE_FILTERS}
          size={18}
          disabled={!appStore.isReady}
          id="attribute-filter-selector"
          className="flex-none adjacent-mar-t-2"
        />

        <Button
          disabled={!appStore.isReady}
          onClick={() => onSelectAttributeFilter("none")}
          className="borradius-1 fontsize-3 pad-3 adjacent-mar-t-2"
        >
          Clear
        </Button>
      </div>
    </div>
  );
});
