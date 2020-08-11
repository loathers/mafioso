import React, {useState} from 'react';

import { ReactComponent as AdventureSVG } from 'images/sands-of-time.svg';
import { ReactComponent as HealthSVG } from 'images/glass-heart.svg';
import { ReactComponent as ManaSVG } from 'images/potion-ball.svg';
import { ReactComponent as SpellbookSVG } from 'images/spell-book.svg';
import { ReactComponent as StarFormationSVG } from 'images/star-formation.svg';
import {ReactComponent as EditSVG} from 'images/scroll-quill.svg';
import { ReactComponent as SteakSVG } from 'images/steak.svg';
import { ReactComponent as SwapBagSVG } from 'images/swap-bag.svg';
import { ReactComponent as TalkSVG } from 'images/talk.svg';
import {ReactComponent as UnknownSVG} from 'images/uncertainty.svg';

import Button from 'components/Button';
import CombatSequenceDisplay, {CombatResultDisplayHandler} from 'components/CombatSequenceDisplay';
import MakeDiabolicPizzaDisplay from 'components/MakeDiabolicPizzaDisplay';
import StatChangesDisplay from 'components/StatChangesDisplay';
import SingleDisplay from 'components/SingleDisplay';
import ListDisplay from 'components/ListDisplay';

import combineClassnames from 'utilities/combineClassnames';

/**
 * @returns {React.Component}
 */
export default function EntryDisplayContainer(props) {
  const {
    className,
    entry,
    isUsingCompactMode = true,
    isDevMode = false,
  } = props;

  const [isSelected, toggleSelected] = useState(false); // internal selection state, show expanded
  const [isShowRaw, toggleShowRaw] = useState(false); // show raw data
  const [isShowCompact, toggleCompact] = useState(true); // compact mode
  const prevCompactRef = React.useRef();

  React.useEffect(() => {
    // is we received a change in `isUsingCompactMode`
    if (prevCompactRef.current !== isUsingCompactMode) {
      toggleCompact(isUsingCompactMode);
      toggleSelected(isUsingCompactMode);
    }

    // cache props previous value
    prevCompactRef.current = isUsingCompactMode;
  }, [isUsingCompactMode]);

  React.useEffect(() => {
    toggleCompact(isSelected);
  }, [isSelected]);

  const [currentAnnotations, updateAnnotations] = useState(entry.attributes.annotations);
  const shouldShowAnnotations = currentAnnotations !== null && currentAnnotations !== undefined;

  const isShowRightColumn = isDevMode || !isShowCompact;

  return (
    <div className={combineClassnames('flex-col position-relative', className)}>
      <AnnotationContainer
        onComplete={(newText) => entry.updateAnnotation(newText)}
        shouldShowAnnotations={shouldShowAnnotations}
        annotations={currentAnnotations} />

      <div className={combineClassnames(entry.isAnnotationOnly ? 'display-none' : 'flex-row')}>
        <Button
          onClick={() => toggleSelected(!isSelected)}
          className={combineClassnames('borradius-l-2 pad-2 overflow-hidden flex-row flex-auto', !isShowRightColumn ? 'borradius-r-2' : '')} >
          {/* adventure num column */}
          <EntryAdventureColumn
            entry={entry}
            className='adjacent-mar-l-4 flex-none'
            style={{width: 35}} />

          {/* icon column */}
          <EntryIconColumn
            entry={entry}
            className='adjacent-mar-l-4 flex-none' />

          { !isShowRaw &&
            <div className='flex-col whitespace-pre-wrap flex-auto adjacent-mar-l-4'>
              <EntryHeaderContainer
                entry={entry}
                className='flex-none adjacent-mar-t-2' />

              { !isShowCompact && entry.hasEntryBodyData &&
                <EntryBodyContainer
                  entry={entry}
                  className='flex-auto adjacent-mar-t-2' />
              }
            </div>
          }

          {/* combat */}
          { entry.hasCombatActions && !isShowRaw && !isShowCompact &&
            <CombatSequenceDisplay
              entry={entry}
              className='bor-l-1-third flex-col adjacent-mar-l-4 flex-none' />
          }

          { entry.hasCombatActions && !isShowRaw && isShowCompact &&
            <CombatResultDisplayHandler
              entry={entry}
              isShowCompact={isShowCompact}
              className='aitems-end adjacent-mar-l-4' />
          }

          {/* debug stuff */}
          { isShowRaw &&
            <div className='borradius-1 pad-3 pad-r-8 flex-row flex-auto bg-fourth adjacent-mar-l-4'>
              <div style={{flex: '1 1 33%'}} className={combineClassnames('flex-col whitespace-pre-wrap wordbreak-break flex-auto adjacent-mar-l-3')}>
                {entry.rawText}
              </div>

              <div style={{flex: '1 1 67%'}} className='pad-2 whitespace-pre-wrap bor-l-1-grayest flex-col flex-auto adjacent-mar-l-3'>
                {JSON.stringify(entry.export(), null, 4)}
              </div>
            </div>
          }
        </Button>

        {/* inline day num */}
        { !isShowCompact && entry.dayNum > 0 &&
          <div
            style={{
              fontWeight: 300,
              bottom: 4,
              left: 4,
            }}
            className='fontsize-3 opacity-4 position-absolute'>
            {`Day ${entry.dayNum}`}
          </div>
        }

        {/* right column */}
        { isShowRightColumn &&
          <div className='borradius-r-2 bg-second flex-row pad-2 flex-none'>
            <Button
              onClick={() => updateAnnotations('')}
              style={{width: 30, borderWidth: 0}}
              className='flex-row jcontent-center bg-second fontsize-1 flex-auto adjacent-mar-l-2'>
              <TalkSVG style={{width: 20, height: 20, opacity: 0.5}} className='' />
            </Button>

            { isDevMode &&
              <Button
                onClick={() => toggleShowRaw(!isShowRaw)}
                style={{width: 30, borderWidth: 0}}
                className='flex-row jcontent-center cursor-pointer color-grayer fontsize-1 flex-auto adjacent-mar-l-2'>
                raw
              </Button>
            }
          </div>
        }

      </div>
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryAdventureColumn(props) {
  const {
    className,
    style,
    entry,
  } = props;

  const shouldHideTurnNum = !entry.isCombatEncounter && entry.turnNum <= 0;
  const fontClassName = (!shouldHideTurnNum && !entry.isInBetweenTurns && entry.hasRawTurnNum) ? 'fontsize-5 f-bold color-white' : 'fontsize-5 color-gray';

  return (
    <div
      onClick={props.onClick}
      className={combineClassnames('flex-col', className)}
      style={style}>
      <div className={combineClassnames('talign-right width-full aself-start adjacent-mar-t-2', fontClassName)}>
        {!shouldHideTurnNum ? entry.turnNum : '-'}
      </div>

      { entry.isFreeCombat &&
        <div className='talign-right fontsize-2 adjacent-mar-t-2'>
          free
        </div>
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryIconColumn(props) {
  const {
    className,
    entry,
  } = props;

  const {attributes} = entry;
  const {isLevelUp} = attributes;

  const EntryIconComponent = entry.entryIcon || UnknownSVG;

  return (
    <div className={combineClassnames('aitems-center flex-col', className)}>
      <EntryIconComponent
        entry={entry}
        className='flex-none adjacent-mar-t-2'
        style={{width: 25, height: 25,
          opacity: 0.7,
        }} />

      { isLevelUp &&
        <StarFormationSVG
          className='flex-none adjacent-mar-t-2'
          style={{width: 25, height: 25,
            opacity: 0.8,
          }} />
      }
    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryHeaderContainer(props) {
  const {
    className,
    entry,
  } = props;

  if (!entry.hasEntryHeader) {
    return null;
  }

  return (
    <div className={combineClassnames('flex-col adjacent-mar-t-2', className)}>
      { entry.locationDisplay &&
        <div className='fontsize-2 color-gray flex-none adjacent-mar-t-1'>{entry.locationDisplay}</div>
      }

      { entry.encounterDisplay &&
        <div className='fontsize-5 overflow-hidden flex-row flex-none adjacent-mar-t-1'>
          <div className='f-bold flex-none adjacent-mar-l-5'>
            {entry.encounterDisplay}
          </div>

          { entry.hasReplacedEnemies &&
            <div
              style={{textDecoration: 'line-through'}}
              className='flex-none adjacent-mar-l-5'>
              {entry.replacedEnemiesDisplay}
            </div>
          }

          { entry.showAdditionalDisplay && entry.hasAdditionalDisplay &&
            <div
              className='flex-none adjacent-mar-l-5'>
              {entry.additionalDisplay}
            </div>
          }
        </div>
      }

    </div>
  )
}
/**
 * @returns {React.Component}
 */
function EntryBodyContainer(props) {
  const {
    className,
    entry,
  } = props;

  return (
    <div className={combineClassnames('flex-col whitespace-pre-wrap', className)}>
      {/* text content */}
      { entry.hasContentDisplay &&
        <div className='fontsize-4 flex-col adjacent-mar-t-2'>
          {entry.contentDisplay}
        </div>
      }

      {/* diabolic pizza */}
      { entry.hasDiabolicPizzaIngredients &&
        <MakeDiabolicPizzaDisplay className='adjacent-mar-t-2' entry={entry} />
      }

      {/* stat changes */}
      { entry.hasStatChanges &&
        <StatChangesDisplay
          entry={entry}
          className='' />
      }

      {/* gained effects */}
      { entry.hasAcquiredEffects &&
        <ListDisplay
          IconComponent={SpellbookSVG}
          list={entry.attributes.acquiredEffects}
          className='flex-none' />
      }

      {/* items */}
      { entry.hasAcquiredItems &&
        <ListDisplay
          IconComponent={SwapBagSVG}
          list={entry.attributes.acquiredItems}
          className='flex-none' />
      }

      <div className='flex-row'>
        {/* adventures */}
        { entry.hasAdventureChanges &&
          <SingleDisplay
            IconComponent={AdventureSVG}
            className='mar-1'
            content={`${entry.adventureDisplay} adventures`} />
        }

        {/* meat */}
        { entry.hasMeatChanges &&
          <SingleDisplay
            IconComponent={SteakSVG}
            className='mar-1'
            content={`${entry.createMeatDisplay()} meat`} />
        }

        {/* hp */}
        { entry.hasHealthChanges &&
          <SingleDisplay
            IconComponent={HealthSVG}
            className='mar-1'
            content={`${entry.healthDisplay} hp`} />
        }

        {/* mp */}
        { entry.hasManaChanges &&
          <SingleDisplay
            IconComponent={ManaSVG}
            className='mar-1'
            content={`${entry.manaDisplay} mp`} />
        }
      </div>
    </div>
  )
}
/** @returns {React.Component} */
function AnnotationContainer(props) {
  const {
    className,
    isAnnotationOnly,
    shouldShowAnnotations,
    annotations,
    onComplete,
  } = props;

  const inputRef = React.useRef();
  const [isEditing, toggleEditing] = useState(false);
  const [editText, updateEditText] = useState(annotations);

  const onChangeText = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    updateEditText(evt.target.value);
  }

  const onToggleEditing = (evt) => {
    if (isEditing && (evt.target.type === 'text' || evt.target.type === 'submit')) {
      evt.preventDefault();
    } else if (isEditing) {
      onComplete(editText);
      toggleEditing(false);
    } else {
      toggleEditing(true);
    }
  }

  const onBlurInput = (evt) => {
    onComplete(editText);
    toggleEditing(false);
  }

  React.useEffect(() => {
    if (inputRef && inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing])

  if (!shouldShowAnnotations) {
    return null;
  }

  return (
    <button
      onClick={onToggleEditing}
      componentname={isAnnotationOnly ? 'annotation-box' : 'arrow-box-down'}
      className={combineClassnames('borradius-3 mar-h-2 mar-t-3 mar-b-2 whitespace-pre-wrap flex-row aitems-center jcontent-start flex-none', className)}>

      <div className='flex-row mar-h-5 adjacent-mar-l-3'>
        <TalkSVG style={{width: 20, height: 20, opacity: 0.5}} className='adjacent-mar-l-3' />
        { isEditing &&
          <EditSVG style={{width: 20, height: 20, opacity: 0.5}} className='adjacent-mar-l-3' />
        }
      </div>

      { !isEditing &&
        <div className='pad-3 adjacent-mar-l-3'>{editText}</div>
      }

      <input
        ref={inputRef}
        onChange={onChangeText}
        onBlur={onBlurInput}
        value={editText}
        type='text'
        className={combineClassnames('pad-3 bor-1-gray width-full adjacent-mar-l-3', !isEditing ? 'display-none' : '')} />

    </button>
  )
}