import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import Button from 'components/DarkButton';

import combineClassnames from 'utilities/combineClassnames';

class PopupController {
  constructor() {
    /** @type {Boolean} */
    this.isActive = observable.box(false);
    /** @type {Object} */
    this.popupData = {
      /** @type {*} */
      children: null,
      /** @type {Function} */
      onClose: () => {},
    };
  }
  /**
   * @param {Boolean} nextActive
   */
  toggleActive(nextActive = true) {
    this.isActive.set(nextActive);
  }
  /**
   * @param {Object} props
   */
  show(props = {}) {
    this.toggleActive(false);
    this.popupData = {
      ...this.popupData,
      ...props,
    };
    this.toggleActive(true);
  }
}
const popupController = new PopupController();
export default popupController;
/** @returns {React.Component} */
export const PopupComponent = observer(
function _PopupComponent(props) {
  const {
    className,
    ...otherProps
  } = props;

  const {
    children,
    onClose = () => {},

  } = popupController.popupData;

  function onClickClose(evt) {
    popupController.toggleActive(false);
    onClose(evt);
  }

  const isActive = popupController.isActive.get();

  return (
    <div
      {...otherProps}
      elementname='app-popup'
      className={combineClassnames('', isActive && 'active', className)}
    >
      { isActive &&
        <div elementname='app-popup-darkness'/>
      }

      <div
        elementname='app-popup-inner'
        className={combineClassnames('color-white pad-2 whitespace-pre-wrap borradius-t-1 borradius-b-2 boxshadow-dark flex-col bg-fifth')}>

        <div className='adjacent-mar-t-3'>
          { children }
        </div>

        <div className='flex-row adjacent-mar-t-3'>
          <Button
            onClick={onClickClose}
            className='pad-2 adjacent-mar-l-2'>
            Close
          </Button>
        </div>

      </div>
    </div>
  )
});

