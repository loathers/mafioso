import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import combineClassnames from "../utilities/combineClassnames";

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
      /** @type {String} */
      type: "",
    };
  }
  /**
   * @param {Boolean} nextActive
   */
  toggleActive(nextActive = true) {
    this.isActive.set(nextActive);

    // if making active, toggle it off after a delay
    if (nextActive) {
      if (this.currTimeout) {
        clearTimeout(this.currTimeout);
      }

      this.currTimeout = setTimeout(() => {
        this.isActive.set(false);
      }, 4000);
    }
  }
  /**
   * @param {Object} props
   */
  show(props = {}) {
    this.toggleActive(false);
    this.toasterData = props;
    this.toggleActive(true);
  }
  /**
   * @param {Object} props
   */
  success(props = {}) {
    this.show({ ...props, type: "SUCCESS" });
  }
  /**
   * @param {Object} props
   */
  warn(props = {}) {
    this.show({ ...props, type: "WARN" });
  }
  /**
   * @param {Object} props
   */
  error(props = {}) {
    this.show({ ...props, type: "ERROR" });
  }
}
const toastController = new ToastController();
export default toastController;
/** @returns {React.Component} */
export const ToasterComponent = observer(function _ToasterComponent(props) {
  const { className, ...otherProps } = props;

  const activeClassname = toastController.isActive.get() && "active";
  const { title, content, type } = toastController.toasterData;

  const typeClassnameMap = {
    SUCCESS: "bg-green",
    WARN: "bg-yellow",
    ERROR: "bg-red",
  };
  const typeColor = typeClassnameMap[type] || "bg-fifth-lighter";

  return (
    <div
      {...otherProps}
      elementname="app-toaster"
      className={combineClassnames(
        "bg-fifth whitespace-pre-wrap boxshadow-dark flex-row",
        activeClassname,
        className,
      )}
    >
      <div
        style={{ width: 5 }}
        className={combineClassnames("flex-none adjacent-mar-t-2", typeColor)}
      />

      <div className="pad-v-3 pad-h-4 flex-col flex-grow adjacent-mar-l-2">
        {title && (
          <div className="flex-none fontsize-5 f-bold adjacent-mar-t-2">
            {title}
          </div>
        )}

        {content && (
          <div className="flex-auto fontsize-3 adjacent-mar-t-2">{content}</div>
        )}
      </div>
    </div>
  );
});
