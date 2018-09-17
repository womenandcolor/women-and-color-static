import React from 'react'
import { Helmet } from "react-helmet";
import Notification from 'appCommon/Notification'
import Navigation from '../navigation/Navigation'
import Footer from '../footer/Footer'
import withRoot from '../../utils/withRoot'
import { container, innerContainer } from 'appAssets/css/styles.module.css'
import favicon from 'appAssets/images/favicon.png'
import {
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_DESCRIPTION,
} from 'appHelpers/constants'

const Layout = props => {
  return (
    <div>
      <Helmet>
        <title>{props.title || DEFAULT_PAGE_TITLE}</title>
        <meta
          name="Description"
          content={props.description || DEFAULT_PAGE_DESCRIPTION}
        />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <Notification />
      <div className={container}>
        <Navigation location={props.location} />
        <div className={innerContainer}>{props.children}</div>
        <Footer location={props.location} />
      </div>
    </div>
  )
}

export default withRoot(Layout)
