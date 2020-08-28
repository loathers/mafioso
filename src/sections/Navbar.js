import React from 'react';
// import {observer} from 'mobx-react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import {LOG_VIS_URL, CHARTS_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LogoComponent from 'components/LogoComponent';

import LogUploader from 'sections/LogUploader';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default withRouter(
function Navbar(props) {
  const {
    className,
    location,
  } = props;

  const pageName = location.pathname.split('/')[1];

  const handleOnSend = () => {
    const oReq = new XMLHttpRequest();
    const url='http://localhost:8080/api/upload';
    oReq.open('POST', url);
    oReq.send(logStore.createLogFile());
  }

  return (
    <div
      elementname='app-navbar'
      className={combineClassnames('zindex-7 pad-v-1 flex-row aitems-center', className)}>
      <LogoComponent className='adjacent-mar-l-6' />

      <div className='jcontent-end flex-auto flex-row adjacent-mar-l-6'>
        <LogUploader
          children={'Upload Log'}
          className='fontsize-4 adjacent-mar-l-3' />

        <NavbarButton
          onClick={handleOnSend}
          disabled={!appStore.isReady}
          children='Share'
          componentType='button'
          className='adjacent-mar-l-3' />

        <NavbarButton
          to={LOG_VIS_URL}
          componentType={Link}
          isActive={pageName === 'visualizer'}
          disabled={!appStore.isReady}
          children='Visualizer'
          className='adjacent-mar-l-3' />

        <NavbarButton
          to={CHARTS_URL}
          componentType={Link}
          isActive={pageName === 'charts'}
          disabled={!appStore.isReady}
          children='Charts'
          className='adjacent-mar-l-3' />
      </div>
    </div>
  )
})

function NavbarButton(props) {
  const {
    componentType = 'div',
    className,
    disabled,
    isActive,
    ...otherProps
  } = props;

  const activeClassname = isActive ? 'color-green-lighter' : (disabled ? 'color-grayer' : 'color-white');
  const componentClassName = combineClassnames('pad-5 borradius-2', activeClassname, className);

  const finalComponentType = (disabled || isActive) ? 'div' : componentType;
  return React.createElement(
    finalComponentType,
    {...otherProps, className: componentClassName},
  );
}
