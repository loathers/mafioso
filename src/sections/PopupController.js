import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import combineClassnames from 'utilities/combineClassnames';

class PopupController {
  constructor() {
    /** @type {Boolean} */
    this.isActive = observable.box(false);
    /** @type {Object} */
    this.popupData = {
      /** @type {*} */
      children: null,
      /** @type {String | null} */
      title: null,
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
  /**
   *
   */
  hide() {
    this.toggleActive(false);
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
    title,
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
        <div elementname='app-popup-darkness' onClick={onClickClose}/>
      }

      <div
        elementname='app-popup-inner'
        className={combineClassnames('color-white whitespace-pre-wrap borradius-2 boxshadow-dark flex-col bg-second-darkest')}>

        { title &&
          <div className='pad-h-4 pad-v-3 borradius-t-1 f-bold bg-second'>{title}</div>
        }

        <div className='pad-4'>
          { children }
        </div>
      </div>
    </div>
  )
});

