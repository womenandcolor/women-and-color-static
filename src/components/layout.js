import React from 'react';
import Notification from './common/Notification'
import Navigation from './navigation/Navigation'
import Footer from './footer/Footer'


const Layout = props => {
  return (
    <div>
      <Notification />
      <div className={'container'}>
        <Navigation location={props.location} />
        <div className={'innerContainer'}>{props.children}</div>
        <Footer location={props.location} />
      </div>
    </div>
  )
}

export default Layout;
