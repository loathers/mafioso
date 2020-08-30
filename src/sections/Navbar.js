import React from 'react';
// import {observer} from 'mobx-react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import {LOG_VIS_URL, CHARTS_URL, DATABASE_URL} from 'constants/PAGE_URLS';

import appStore from 'store/appStore';
import logStore from 'store/logStore';

import LogoComponent from 'components/LogoComponent';

import LogUploader from 'sections/LogUploader';

import combineClassnames from 'utilities/combineClassnames';

const enableCharts = process.env['REACT_APP_ENABLE_CHARTS'] === 'true';
const enableDatabase = process.env['REACT_APP_ENABLE_SHARE'] === 'true';

/** @returns {ReactComponent} */
export default withRouter(
function Navbar(props) {
  const {
    className,
    location,
  } = props;

  const pageName = location.pathname.split('/')[1];

  return (
    <div
      elementname='app-navbar'
      className={combineClassnames('zindex-7 pad-v-1 flex-row aitems-center', className)}>
      <LogoComponent className='adjacent-mar-l-6' />

      <div className='jcontent-end flex-auto flex-row adjacent-mar-l-6'>
        <LogUploader
          children={'Upload Log'}
          className='fontsize-4 adjacent-mar-l-3' />

        <NavbarDivider className='pad-l-4' />

        <NavbarButton
          to={LOG_VIS_URL}
          componentType={Link}
          isActive={pageName === 'visualizer'}
          disabled={!appStore.isReady}
          children='Visualizer'
          className='adjacent-mar-l-3' />

        { (appStore.isDevEnv || enableCharts) &&
          <NavbarButton
            to={CHARTS_URL}
            componentType={Link}
            isActive={pageName === 'charts'}
            disabled={!appStore.isReady}
            children='Charts'
            className='adjacent-mar-l-3' />
        }

        { (appStore.isDevEnv || enableDatabase) &&
          <NavbarButton
            to={DATABASE_URL}
            componentType={Link}
            isActive={pageName === 'database'}
            disabled={!appStore.isReady}
            children='Database'
            className='adjacent-mar-l-3' />
        }

        <NavbarDivider />

        <NavbarButton
          onClick={() => appStore.downloadFullLog()}
          disabled={!appStore.isReady}
          children='Download'
          componentType='button'
          className='adjacent-mar-l-3' />

        { (appStore.isDevEnv || enableDatabase) &&
          <NavbarButton
            onClick={() => appStore.onShareLog()}
            disabled={!appStore.isReady || !logStore.isAscensionLog}
            children='Share'
            componentType='button'
            className='adjacent-mar-l-3' />
        }
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
    {...otherProps, disabled: disabled, className: componentClassName},
  );
}

function NavbarDivider(props) {
  return <div className={combineClassnames('pevents-none flex-row-center color-grayer adjacent-mar-l-3', props.className)}>·</div>
}
