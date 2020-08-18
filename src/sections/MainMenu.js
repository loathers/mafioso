import React from 'react';
import {observer} from 'mobx-react';

import {ENTRY_TYPE_FILTERS_SETTINGS, ATTRIBUTE_FILTERS} from 'constants/filterList';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import Button from 'components/Button';
import SelectOptionsComponent from 'components/SelectOptionsComponent';
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
    appStore.shouldScrollUp.set(true);
  }

  // attribute filters
  const [selectedAttribute, updateSelectedAttribute] = React.useState();

  const onSelectAttributeFilter = (attributeName) => {
    if (attributeName === 'none') {
      updateSelectedAttribute('');
      logStore.fetchEntries({filteredAttributes: []});
      appStore.shouldScrollUp.set(true);
    } else {
      updateSelectedAttribute(attributeName);
      logStore.fetchEntries({filteredAttributes: [{attributeName, attributeValue: true}]});
      appStore.shouldScrollUp.set(true);
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

      <div className='flex-col flex-none adjacent-mar-t-5'>
        <UploadComponent
          children={'Upload New'}
          className='fontsize-5 width-full adjacent-mar-t-4' />

        <Button
          onClick={() => logStore.downloadFullLog()}
          disabled={!appStore.isReady}
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
          label={`Visible Categories (${logStore.validEntriesCount})`}
          defaultList={categoriesVisibleList}
          onChange={onChangeVisibleEntries}
          inputType='checkbox'
          className='adjacent-mar-t-2'/>

        <Button
          onClick={() => onApplyEntries(categoriesVisibleList)}
          disabled={!appStore.isReady}
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Apply
        </Button>
      </div>

      {/* filter by attribute */}
      <div className='flex-col flex-none adjacent-mar-t-5'>
        <SelectOptionsComponent
          label='Filter by Attributes'
          onChange={(evt) => onSelectAttributeFilter(evt.target.value)}
          selected={selectedAttribute}
          list={ATTRIBUTE_FILTERS}
          disabled={!appStore.isReady}
          id='attribute-filter-selector'
          className='flex-none adjacent-mar-t-2' />

        <Button
          disabled={!appStore.isReady}
          onClick={() => onSelectAttributeFilter('none')}
          className='borradius-1 fontsize-3 pad-3 adjacent-mar-t-2'>
          Clear
        </Button>
      </div>
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

      <UploadComponent
        style={{height: '70vh', width: '100%'}}
        className='height-full width-full flex-auto adjacent-mar-t-4' >
        <div className='flex-col-center height-full'>
          <div style={{lineHeight: '30px'}} className='flex-col-center fontsize-8 flex-auto'>
            {'Buongiorno!\n\nClick here or drag and drop to upload your Kolmafia session logs.\nYou can upload multiple files and Mafioso here will try to find a full ascension to display for you.'}
          </div>

          <div className='flex-none fontsize-4'>
            {'Thanks for using Mafioso beta!\n\nIf you get an error or have any requests, make a report on Github.\nPlease know that no data is collected and uploaded files are never sent anywhere.'}
          </div>
        </div>
      </UploadComponent>
    </div>
  )
}
