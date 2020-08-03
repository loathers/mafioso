import React from 'react';
import {observer} from 'mobx-react';

import {ENTRY_TYPE_FILTERS_SETTINGS, ATTRIBUTE_FILTERS} from 'constants/filterList';

import appStore from 'store/appStore';
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

  // just for changing page
  const onApplyChangePage = (nextPageNum) => {
    logStore.fetchEntries({pageNum: nextPageNum});
  };

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
  const attributeFiltersList = ATTRIBUTE_FILTERS.map((filterOption) => ({
    ...filterOption,
    checked: logStore.filteredAttributes.includes(filterOption.attributeName),
  }));

  const onChangeAttributes = (list) => {
    const checkedItems = list.filter((item) => item.checked);
    const filteredAttributes = checkedItems.map(({attributeName, attributeValue}) => ({attributeName, attributeValue}));
    logStore.fetchEntries({filteredAttributes: filteredAttributes});
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

      <UploadComponent
        content={'Upload new logs'}
        className='width-full adjacent-mar-t-5' />

      <Button 
        onClick={() => logStore.downloadFullLog()}
        disabled={!logStore.isReady}
        className='flex-col pad-3 adjacent-mar-t-5'>
          <div className='fontsize-7 adjacent-mar-t-4'>Download Log</div>

          { (logStore.hasAscensionNum || logStore.hasCharacterName) &&
            <div className='adjacent-mar-t-4'>
              {/** info */}
              { logStore.hasAscensionNum &&
                <h2 className='fontsize-4 adjacent-mar-t-1'>
                  {`Ascension #${logStore.ascensionNum}`}
                </h2>
              }

              { logStore.hasCharacterName &&
                <h2 className='color-gray fontsize-3 adjacent-mar-t-1'>
                  {`${logStore.characterName}`}
                </h2>
              }
            </div>
          }
      </Button>

      {/* pagination */}
      { logStore.hasParsedEntries &&
        <div className='flex-col flex-none adjacent-mar-t-5'>
          <div className='fontsize-3 pad-2 flex-row-center adjacent-mar-t-3'>
            {`Page ${logStore.currentPageNum + 1}/${logStore.calculatePageLast() + 1} - Entries ${logStore.currentCount}/${logStore.visibleCount}`}
          </div>
          <SimplePaginator
            onChangePage={onApplyChangePage}
            currentPageNum={logStore.currentPageNum}
            className='adjacent-mar-t-3' />
        </div>
      }

      <Button 
        onClick={() => appStore.toggleCompactMode()}
        className='fontsize-2 pad-3 flex-none adjacent-mar-t-5'>
        Toggle Compact Mode
      </Button>

      {/* filters */}
      <FiltersMenu 
        label='Visible Categories'
        defaultList={categoriesVisibleList}
        onChange={onChangeVisibleEntries}
        inputType='checkbox'
        className='adjacent-mar-t-5'/>

      <Button
        onClick={() => onApplyEntries(categoriesVisibleList)}
        disabled={!logStore.isReady} 
        className='fontsize-3 pad-3 adjacent-mar-t-5'>
        Apply
      </Button>

      <FiltersMenu 
        label='Filter Attributes'
        defaultList={attributeFiltersList}
        onChange={onChangeAttributes}
        inputType='radio'
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

      <LogoComponent 
        className='adjacent-mar-t-5'/>

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
      <Button 
        onClick={() => onChangePage(0)}
        disabled={logStore.isOnFirstPage}
        className='pad-4 textalign-center adjacent-mar-l-4'>
          First
      </Button>

      <Button 
        onClick={() => onChangePage(currentPageNum - 1)}
        disabled={logStore.isOnFirstPage}
        className='pad-4 textalign-center adjacent-mar-l-4'>
          {"<"}
      </Button>

      {/*<div className='bg-second pad-4 flex-row-center adjacent-mar-l-4'>{currentPageNum}</div>*/}

      <Button 
        onClick={() => onChangePage(currentPageNum + 1)}
        disabled={logStore.isOnLastPage}
        className='pad-4 textalign-center adjacent-mar-l-4'>
          {">"}
      </Button>

      <Button 
        onClick={() => onChangePage(logStore.calculatePageLast())}
        disabled={logStore.isOnLastPage}
        className='pad-4 textalign-center adjacent-mar-l-4'>
          Last
      </Button>
    </div>
  )
}
