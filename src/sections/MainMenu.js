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
function MainMenu(props) {
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
      // const foundData = availableAttributesList.find((filterData) => {
      //   if (filterData.optionGroup) {
      //     return filterData.optionGroup.find((innerData) => innerData.attributeName === attributeName);
      //   }

      //   return filterData.attributeName === attributeName;
      // });
      logStore.fetchEntries({filteredAttributes: [{attributeName, attributeValue: true}]});
    }
  }

  if (showFull) {
    return <FullPageMenu {...props} />
  }

  return (
    <div 
      componentname='main-menu'
      style={style} 
      className={combineClassnames('flex-col', className)}>

      <LogoComponent 
        className='flex-none adjacent-mar-t-5'/>

      <div className='flex-col flex-none adjacent-mar-t-5'>
        <UploadComponent
          children={'Upload New'}
          className='fontsize-5 width-full adjacent-mar-t-4' />

        <Button 
          onClick={() => logStore.downloadFullLog()}
          disabled={!logStore.isReady}
          className='borradius-1 flex-col pad-3 adjacent-mar-t-4'>
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
      <div className='flex-col flex-none adjacent-mar-t-5'>
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
        className='flex-none adjacent-mar-t-5'>
        <div className='fontsize-3 adjacent-mar-t-2'>Filter Attributes</div>
        <select 
          onChange={(evt) => onSelectAttributeFilter(evt.target.value)}
          size={10}
          className='color-white bg-second borradius-1 fontsize-3 width-full adjacent-mar-t-2'
          id='attribute-filter-selector'>
          { availableAttributesList.map((filterData, idx) => {
            if (filterData.optionGroup) {
              return (
                <optgroup 
                  className='pad-v-1 pad-h-3 adjacent-mar-t-1'
                  key={`optiongroup-${idx}-key`}
                  label={filterData.label}>
                  { filterData.optionGroup.map((suboption, subidx) => (
                    <option 
                      className='fontsize-2 pad-v-1 adjacent-mar-t-1'
                      key={`option-${idx}-${subidx}-key`}
                      value={suboption.attributeName}>
                      {suboption.label}
                    </option>
                  ))}
                </optgroup>
              )
            }

            return (
              <option 
                className='fontsize-2 pad-v-1 pad-h-3 adjacent-mar-t-1'
                key={`option-${idx}-key`}
                value={filterData.attributeName}>
                {filterData.label}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  );
});
/** @returns {React.Component} */
export function FullPageMenu(props) {
  const {
    className,
  } = props;

  return (
    <div 
      style={{width: '90%'}}
      className={combineClassnames('fontsize-4 flex-col', className)}>

      <div className='flex-row flex-none adjacent-mar-t-4'>
        <LogoComponent 
          className='flex-auto adjacent-mar-l-2'/>
      </div>

      <UploadComponent
        style={{height: '70vh', width: '100%'}}
        className='height-full width-full flex-auto adjacent-mar-t-4' >
        <div className='flex-col-center height-full'>
          <div style={{lineHeight: '30px'}} className='flex-col-center fontsize-8 flex-auto'>
            {'Buongiorno!\n\nClick here or drag and drop to upload your Kolmafia session logs.\nYou can upload multiple files and Mafioso here will try to find a full ascension to display for you.'}
          </div>

          <div className='flex-none fontsize-4'>
            {'Thanks for using Mafioso beta!\nThere are still a lot of unsupported text and older logs might not have the data that is needed.\nStill, you should be able to drop them in and visualize them.\n\nIf you get an error or have any requests, make a report on Github.\nPlease know that no data is collected and uploaded files are never sent anywhere.'}
          </div>
        </div>
      </UploadComponent>
    </div>
  )
}
