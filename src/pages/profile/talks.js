// NPM
import React from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

// App
import {
  update as updateTalk,
  create as createTalk,
  destroy as destroyTalk,
} from 'appRedux/modules/featuredTalk'
import StyledButton from 'appCommon/StyledButton'
import EditTalk from 'appComponents/profile/EditTalk'
import EditProfileLayout from 'appComponents/layouts/EditProfile'

import css from 'appAssets/css/profile.module.css'

const emptyTalk = {
  event_name: '',
  talk_title: '',
  url: '',
  image: '',
}

const PAGE_TITLE = "Edit your featured talks"

const Talks = props => {
  const { talks } = props

  if (!props.profile.isInitialized || props.profile.isLoading) {
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />
  }

  return (
    <div className={css.talkContainer}>
      <div className={css.talkList}>
        {talks.map((talk, index) => (
          <EditTalk
            talk={talk}
            key={`talk-${index}`}
            saveTalk={props.saveTalk}
            destroyTalk={props.destroyTalk}
            profile={props.profile.id}
            user={props.user}
          />
        ))}
      </div>

      {talks.length < 6 && (
        <div className={css.section}>
          <StyledButton
            disabled={talks.length >= 7}
            color="secondary"
            className={css.addNewTalk}
            onClick={props.addEmptyTalk}
          >
            Add new talk
          </StyledButton>
        </div>
      )}
    </div>
  )
}

class TalksContainer extends React.Component {
  state = {
    talks: this.props.profile.featured_talks || [],
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.profile.featured_talks !== this.props.profile.featured_talks
    ) {
      this.setState({ talks: this.props.profile.featured_talks })
    }
  }

  saveTalk = talkData => {
    if (talkData.id) {
      this.props.updateTalk({ ...talkData, profile: this.props.profile.id })
    } else {
      this.props.createTalk({ ...talkData, profile: this.props.profile.id })
    }
  }

  destroyTalk = talkData => {
    this.props.destroyTalk(talkData)
  }

  addEmptyTalk = () => {
    this.setState({ talks: this.state.talks.concat(emptyTalk) })
  }

  render() {
    const { props } = this

    return (
      <EditProfileLayout title={PAGE_TITLE} {...props}>
        <div className={css.section}>
          <h1 className={css.header}>{PAGE_TITLE}</h1>
        </div>
        <Talks
          talks={this.state.talks}
          saveTalk={this.saveTalk}
          destroyTalk={this.destroyTalk}
          addEmptyTalk={this.addEmptyTalk}
          handleSubmit={event => {
            event.preventDefault()
            props.updateProfile()
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value })
          }}
          {...props}
        />
      </EditProfileLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    notification: state.notification.message,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createTalk: data => {
      dispatch(createTalk(data))
    },
    updateTalk: data => {
      dispatch(updateTalk(data))
    },
    destroyTalk: data => {
      dispatch(destroyTalk(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TalksContainer)
