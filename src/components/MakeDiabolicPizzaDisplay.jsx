import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// import SteakSVG from '../images/steak.svg';

import combineClassnames from '../utilities/combineClassnames';

/** @returns {React.Component} */
function IngredientBlockDisplay(props) {
  const {
    className,
    content,
  } = props;

  const firstLetter = content.charAt(0).toUpperCase();

  return (
    <div 
      className={combineClassnames('overflow-hidden bg-second-darker borradius-2 mar-2 pad-2 boxsizing-border flex-col-center position-relative', className)}
      style={{
        // minWidth: 70,
        // maxWidth: 140,
        width: 80,
        height: 80,
      }}>

      <div 
        className='flex-none adjacent-mar-t-2 position-absolute'
        style={{
          top: 5,
          left: 5,
          width: 20,
          height: 20,
          opacity: 0.3,
        }}>
        {firstLetter}
      </div>

      <div className='fontsize-3 color-white zindex-1 talign-center flex-none'>
        {content}
      </div>
    </div>
  )
}
/** @returns {React.Component} */
export default function MakeDiabolicPizzaDisplay(props) {
  const {
    className,
    entry,
  } = props;
  
  const {attributes} = entry;
  const {diabolicPizzaIngredients} = attributes;

  return (
    <div 
      className={combineClassnames('flex-row flexwrap-yes', className)}
      style={{width: 200}}>

      {diabolicPizzaIngredients.map((ingredientName) => 
        <IngredientBlockDisplay 
          content={ingredientName}
          key={`ingreident-name-${uuidv4()}-key`} />
      )}
    </div>
  );
}