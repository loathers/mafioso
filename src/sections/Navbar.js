import React from 'react';
import {observer} from 'mobx-react';
import {Link} from "react-router-dom";

// import appStore from 'store/appStore';

// import DarkButton from 'components/DarkButton';
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
      elementname='app-navbar'
      className={combineClassnames('pad-v-1 flex-row aitems-center', className)}>
      <LogoComponent />

      <div className='jcontent-end flex-auto flex-row mar-l-6'>
        <NavbarLink
          to='/vis'
          isActive
          children='Visualizer'
          className='adjacent-mar-l-3' />

        <NavbarLink
          disabled
          to='/wiki'
          children='Wiki'
          className='adjacent-mar-l-3' />

        <NavbarLink
          disabled
          to='/logdb'
          children='Database'
          className='adjacent-mar-l-3' />
      </div>
    </div>
  )
})

function NavbarLink(props) {
  const {
    className,
    isActive,
    ...otherProps
  } = props;

  const activeClassname = isActive ? 'bor-1-green-lighter bg-green' : 'bor-1-grayer';

  return (
    <Link
      {...otherProps}
      className={combineClassnames('pad-5 borradius-2 color-white', activeClassname, className)} />
  )
}