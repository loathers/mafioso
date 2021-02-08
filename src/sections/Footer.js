import React from 'react';

import {ReactComponent as GithubSVG} from 'images/github.svg';
import {ReactComponent as ShareSVG} from 'images/share.svg';

import combineClassnames from 'utilities/combineClassnames';

/** @returns {React.Component} */
export default function Footer(props) {
  const {
    className,
    style,
  } = props;

  return (
    <div
      elementname='app-footer'
      style={style}
      className={combineClassnames('aself-start fontsize-2 flex-row-center', className)}>

      <FooterLink href='https://elementten.com'>
        <div className='adjacent-mar-l-2'>About me</div>
        <ShareSVG className='adjacent-mar-l-2' style={{width: 16, height: 16, fill: '#696969'}}/>
      </FooterLink>

      <FooterLink href='https://github.com/aahvocado/KoL-Mafioso/'>
        <div className='adjacent-mar-l-2'>Source</div>
        <GithubSVG className='adjacent-mar-l-2' style={{width: 16, height: 16, fill: '#696969'}}/>
      </FooterLink>

      <FooterLink href='https://github.com/aahvocado/KoL-Mafioso/issues'>
        <div className='adjacent-mar-l-2'>Support</div>
      </FooterLink>

      <div className='color-grayest hover:color-grayer pad-2 flex-row-center adjacent-mar-l-5'>
        {`v${process.env.REACT_APP_VERSION || '?'}`}
      </div>
    </div>
  )
}

/** @returns {React.Component} */
function FooterLink(props) {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      {...props}
      className='color-grayest hover:color-grayer pad-2 flex-row-center adjacent-mar-l-5' >
    </a>
  )
}
