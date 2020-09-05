import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import combineClassnames from 'utilities/combineClassnames';

class ToastController {
  constructor() {
    /** @type {Boolean} */
    this.isActive = observable.box(false);
    /** @type {Timeout} */
    this.currTimeout = undefined;
    /** @type {Object} */
    this.toasterData = {
      /** @type {*} */
      title: null,
      /** @type {*} */
      content: null,
    };
  }
  /**
   * @param {Boolean} nextActive
   */
  toggleActive(nextActive = true) {
    if (this.currTimeout) {
      clearTimeout(this.currTimeout);
    }

    this.isActive.set(nextActive);

    // if making active, toggle it off after a delay
    if (nextActive) {
      this.currTimeout = setTimeout(() => {
        this.isActive.set(false);
      }, 4000);
    }
  }
  /**
   * @param {Object} props
   */
  show(props = {}) {
    this.toasterData = props;
    this.toggleActive(true);
  }
}
const toastController = new ToastController();
export default toastController;
/** @returns {React.Component} */
export const ToasterComponent = observer(
function _ToasterComponent(props) {
  const {
    className,
    ...otherProps
  } = props;

  const activeClassname = toastController.isActive.get() && 'active';
  const {title, content} = toastController.toasterData;

  return (
    <div
      {...otherProps}
      elementname='app-toaster'
      className={combineClassnames('bg-fifth pad-v-3 pad-h-4 borradius-4 flex-col', activeClassname, className)}
    >
      { title &&
        <div className='flex-none fsize-5 f-bold adjacent-mar-t-2'>{title}</div>
      }

      { content &&
        <div className='flex-auto adjacent-mar-t-2'>{content}</div>
      }
    </div>
  )
});

