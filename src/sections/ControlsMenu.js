import React from 'react';
import {observer} from 'mobx-react';

import {ENTRY_TYPE_FILTERS_SETTINGS, ATTRIBUTE_FILTERS} from 'constants/filterList';

import logStore from 'store/logStore';

import Button from 'components/Button';
import LogoComponent from 'components/LogoComponent';
import UploadComponent from 'components/UploadComponent';

import FiltersMenu from 'sections/FiltersMenu';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @param {Object} props
 * @returns {React.Component}
 */
export default observer(
function ControlsMenu(props) {
  const {
    className,
    style,
    showFull,
  } = props;

  // visible entries
  const [categoriesVisibleList, updateVisibleList] = React.useState(ENTRY_TYPE_FILTERS_SETTINGS);

  const onChangeVisibleEntries = (list) => {
    updateVisibleList(list);
  }

  const onApplyEntries = (list) => {
    const checkedItems = list
      .filter((item) => item.checked)
      .map((item) => item.categoryId);
    logStore.fetchEntries({categoriesVisible: checkedItems});
  }

  // attribute filters
  const availableAttributesList = ATTRIBUTE_FILTERS.filter((filterData) => !filterData.isHidden);

  const onSelectAttributeFilter = (attributeName) => {
    if (attributeName === 'none') {
      logStore.fetchEntries({filteredAttributes: []});
    } else {
      const foundData = availableAttributesList.find((filterData) => filterData.attributeName === attributeName);
      logStore.fetchEntries({filteredAttributes: [{attributeName, attributeValue: foundData.attributeValue}]});
    }
  }

  if (showFull) {
    return <FullPageMenu />
  }

  return (
    <div 
      style={style} 
      className={combineClassnames('position-fixed flex-col', className)}>

      <LogoComponent 
        className='adjacent-mar-t-5'/>

      <div className='flex-col adjacent-mar-t-5'>
        <UploadComponent
          content={'Upload new logs'}
          className='fontsize-5 width-full adjacent-mar-t-2' />

        <Button 
          onClick={() => logStore.downloadFullLog()}
          disabled={!logStore.isReady}
          className='borradius-1 flex-col pad-3 adjacent-mar-t-2'>
          <div className='fontsize-5 adjacent-mar-t-4'>Download Log</div>

          { (logStore.hasAscensionNum || logStore.hasCharacterName) &&
            <div className='adjacent-mar-t-4'>
              {/** info */}
              { logStore.hasAscensionNum &&
                <h2 className='fontsize-3 adjacent-mar-t-1'>
                  {`Ascension #${logStore.ascensionNum}`}
                </h2>
              }

              { logStore.hasCharacterName &&
                <h2 className='color-gray fontsize-2 adjacent-mar-t-1'>
                  {`${logStore.characterName} - ${logStore.ascensionAttributes.className}`}
                </h2>
              }
            </div>
          }
        </Button>
      </div>

      {/* change visible entries */}
      <div className='flex-col adjacent-mar-t-5'>
        <FiltersMenu 
          label={`Visible Categories (${logStore.visibleCount})`}
          defaultList={categoriesVisibleList}
          onChange={onChangeVisibleEntries}
          inputType='checkbox'
          className='adjacent-mar-t-2'/>

        <Button
          onClick={() => onApplyEntries(categoriesVisibleList)}
          disabled={!logStore.isReady} 
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Apply
        </Button>
      </div>

      {/* filter by attribute */}
      <label 
        htmlFor='attribute-filter-selector'
        className='adjacent-mar-t-5'>
        <div className='fontsize-3 adjacent-mar-t-2'>Filter Attributes</div>
        <select 
          onChange={(evt) => onSelectAttributeFilter(evt.target.value)}
          className='color-white bg-second borradius-1 fontsize-3 pad-3 width-full adjacent-mar-t-2'
          id='attribute-filter-selector'>
          { availableAttributesList.map((filterData, idx) => (
            <option 
              className='fontsize-2'
              key={`option-${idx}-key`}
              value={filterData.attributeName}>
              {filterData.label}
            </option>
          ))
          }
        </select>
      </label>
    </div>
  );
});
/**
 * @param {Object} props
 * @returns {React.Component}
 */
function FullPageMenu(props) {
  const {
    className,
  } = props;

  return (
    <div 
      style={{width: '90%'}}
      className={combineClassnames('fontsize-4 flex-col flex-none', className)}>

      <LogoComponent 
        className='adjacent-mar-t-2'/>

      <UploadComponent
        content={'Upload or drop in your session logs! I\'ll attempt to find a full ascension if you upload multiple logs.'}
        style={{height: '70vh', width: '100%'}}
        className='width-full flex-auto adjacent-mar-t-2' />
    </div>
  )
}