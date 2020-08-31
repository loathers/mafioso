import React from 'react';
import {observer} from 'mobx-react';
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
      className={combineClassnames('zindex-7 pad-v-3 flex-col jcontent-center', className)}>

      <UpperNavbar
        pageName={pageName}
        className='flex-none adjacent-mar-t-1' />

    </div>
  )
})
/** @returns {ReactComponent} */
const UpperNavbar = observer(
function _UpperNavbar(props) {
  const {
    className,
    pageName,
  } = props;

  return (
    <div className={combineClassnames('flex-row aitems-center', className)}>
      <LogoComponent className='adjacent-mar-l-6' />

      { logStore.hasParsedEntries && logStore.isAscensionLog &&
        <LogOwnerDescription className='flex-none adjacent-mar-l-6' />
      }

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
            // disabled={!appStore.isReady}
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
/** @returns {ReactComponent} */
const LogOwnerDescription = observer(
function _LogOwnerDescription(props) {
  const {className} = props;

  return (
    <div className={combineClassnames('fontsize-3 overflow-hidden flex-row', className)}>
      <span className='adjacent-mar-l-2'>starring</span>
      <span className='f-bold adjacent-mar-l-2'>{logStore.characterName}</span>
      <span className='adjacent-mar-l-2'>{`the ${logStore.className}`}</span>
      <span className='adjacent-mar-l-2'>in</span>
      <span className='f-bold adjacent-mar-l-2'>{`${logStore.difficultyName} ${logStore.pathName}`}</span>
      <span className='f-italic f-thin adjacent-mar-l-2'>{`"${generateTagline()}"`}</span>
    </div>
  )
});
const taglines = [
  "Click here for the top 10 secret strats!",
  "Will there be crabsicles?",
  "It isn't over 'til Aenimus sings!",
  "Didn't have enough oranges this run.",
  "Rolled a nat 20 this run!",
  "Did it with lofi hip hop beats to relax/study to in the background.",
  "I'm very proud of this one!",
  "Found an Ultrarare in this run!",
  "YOU'RE BREATHTAKING!",
  "I think Ezandora made this happen.",
  "Did a great job by wearing a mask the entire run.",
];
/**
 * @returns {String}
 */
function generateTagline() {
  const randomNumba = Math.floor(Math.random() * taglines.length);
  return taglines[randomNumba];
}
/** @returns {ReactComponent} */
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
/** @returns {ReactComponent} */
function NavbarDivider(props) {
  return <div className={combineClassnames('pevents-none flex-row-center color-grayer adjacent-mar-l-3', props.className)}>·</div>
}
