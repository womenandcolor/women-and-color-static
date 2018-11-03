import React from 'react'
import { Helmet } from 'react-helmet'
import { push } from 'gatsby'
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

class Layout extends React.Component {
  componentDidMount() {
    const hash = this.props.location.hash
    if (hash) {
      let result
      const speakerRegex = /#\/speaker\/(\d+)\/([a-zA-Z-]+)\/?$/gi
      result = speakerRegex.exec(hash)
      if (result) {
        const speakerId = result[1]
        const speakerName = result[2]
        const newPath = `/speakers/${speakerId}/${speakerName}/`
        return push(newPath)
      }

      const legacyPathRegex = /#\/(register|login|reset-password|terms|privacy|code-of-conduct|about)\/?$/g
      result = legacyPathRegex.exec(hash)
      if (result) {
        const newPath = `/${result[1]}`
        return push(newPath)
      }
    }
  }

  render() {
    const { props } = this
    return (
      <>
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
      </>
    )
  }
}

export default withRoot(Layout)
