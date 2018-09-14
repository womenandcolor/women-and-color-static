import React from 'react';
import Notification from 'appCommon/Notification'
import Navigation from '../navigation/Navigation'
import Footer from '../footer/Footer'
import withRoot from '../../utils/withRoot';
import { container, innerContainer } from 'appAssets/css/styles.module.css';

const Layout = props => {
  return (
    <div>
      <Notification />
      <div className={container}>
        <Navigation location={props.location} />
        <div className={innerContainer}>{props.children}</div>
        <Footer location={props.location} />
      </div>
    </div>
  )
}

export default withRoot(Layout);
