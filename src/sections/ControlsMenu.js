import React from 'react';
import {observer} from 'mobx-react';

import {ENTRY_TYPE_FILTERS, ATTRIBUTE_FILTERS} from 'constants/filterList';

// import appStore from 'store/appStore';
import logStore from 'store/logStore';

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

  if (showFull) {
    return <FullPageMenu />
  }

  const entryFiltersList = ENTRY_TYPE_FILTERS.map((filterOption) => ({
    ...filterOption,
    checked: !logStore.filteredTypes.includes(filterOption.entryType)
  }));

  const attributeFiltersList = ATTRIBUTE_FILTERS.map((filterOption) => ({
    ...filterOption,
    checked: logStore.filteredAttributes.includes(filterOption.attributeName)
  }));

  const onApplyChangePage = (nextPageNum) => {
    logStore.fetchEntries({pageNum: nextPageNum});
  };

  const onApplyEntries = (list) => {
    const uncheckedItems = list.filter((item) => !item.checked);
    const uncheckedTypes = uncheckedItems.map((item) => item.entryType);
    logStore.fetchEntries({filteredTypes: uncheckedTypes});
  }

  const onApplyAttributes = (list) => {
    const checkedItems = list.filter((item) => item.checked);
    const filteredAttributes = checkedItems.map(({attributeName, attributeValue}) => ({attributeName, attributeValue}));
    logStore.fetchEntries({filteredAttributes: filteredAttributes});
  }

  return (
    <div 
      style={style} 
      className={combineClassnames('position-fixed flex-col', className)}>

      <h1 className='aself-start fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </h1>

      <UploadComponent
        content={'Upload new logs'}
        className='width-full adjacent-mar-t-5' />
      
      {/** info */}
      <div className='flex-col fontfamily-primary adjacent-mar-t-5 flex-none'>
        { logStore.hasCharacterName &&
          <h2 className='color-gray fontsize-4 adjacent-mar-t-1'>
            {`${logStore.characterName}`}
          </h2>
        }

        { logStore.hasAscensionNum &&
          <h2 className='fontsize-7 adjacent-mar-t-1'>
            {`Ascension #${logStore.ascensionNum}`}
          </h2>
        }
      </div>

      {/* pagination */}
      { logStore.hasCurrentEntries &&
        <div
          className='flex-col flex-none adjacent-mar-t-5'>
          <div className='fontsize-3 bg-second pad-4 flex-row-center adjacent-mar-t-3'>{`Page ${logStore.currentPageNum + 1}/${logStore.calculatePageLast() + 1}`}</div>
          <SimplePaginator
            onChangePage={onApplyChangePage}
            currentPageNum={logStore.currentPageNum}
            className='adjacent-mar-t-3' />
        </div>
      }

      {/* filters */}
      <FiltersMenu 
        label='Shown Entries'
        onApply={onApplyEntries}
        defaultList={entryFiltersList}
        className='adjacent-mar-t-5'/>

      <FiltersMenu 
        label='Filter Attributes'
        onApply={onApplyAttributes}
        defaultList={attributeFiltersList}
        className='adjacent-mar-t-5'/>
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

      <h1 className='aself-start fontsize-9 fontfamily-tertiary adjacent-mar-t-5 flex-none'>
        Shiny Log Visualizer
      </h1>

      <UploadComponent
        content={'Upload or drop in your session logs! I\'ll attempt to find a full ascension if you upload multiple logs.'}
        style={{height: '70vh', width: '100%'}}
        className='width-full flex-auto adjacent-mar-t-5' />
    </div>
  )
}
/**
 * @param {Object} props
 * @returns {React.Component}
 */
function SimplePaginator(props) {
  const {
    className,
    onChangePage,
    currentPageNum,
  } = props;

  return (
    <div className={combineClassnames('fontsize-4 flex-row-center flex-none', className)}>
      <button 
        onClick={() => onChangePage(0)}
        disabled={logStore.isOnFirstPage}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          First
      </button>

      <button 
        onClick={() => onChangePage(currentPageNum - 1)}
        disabled={logStore.isOnFirstPage}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          {"<"}
      </button>

      {/*<div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>*/}

      <button 
        onClick={() => onChangePage(currentPageNum + 1)}
        disabled={logStore.isOnLastPage}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          {">"}
      </button>

      <button 
        onClick={() => onChangePage(logStore.calculatePageLast())}
        disabled={logStore.isOnLastPage}
        className='borradius-1 bg-second pad-4 textalign-center adjacent-mar-l-4'>
          Last
      </button>
    </div>
  )
}
