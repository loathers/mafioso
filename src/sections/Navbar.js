import React from 'react';
import {observer} from 'mobx-react';

import appStore from 'store/appStore';

import DarkButton from 'components/DarkButton';
import LogoComponent from 'components/LogoComponent';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {ReactComponent} */
export default observer(
function Navbar(props) {
  const {
    className,
  } = props;

  return (
    <div
      componentname='app-navbar'
      className={combineClassnames('pad-3 flex-row aitems-center', className)}>
      <LogoComponent />
    </div>
  )
})