// NPM
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import ReactLoading from 'react-loading'

// App
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile'
import { get as getLocations } from 'appRedux/modules/location'
import { showNotification } from 'appRedux/modules/notification'
import StyledButton from 'appCommon/StyledButton'
import FormField from 'appCommon/FormField'
import ImageUpload from 'appCommon/ImageUpload'
import DefaultLayout from '../../components/layouts/Default'

import css from 'appAssets/css/onboarding.module.css'

const CURRENT_PAGE = 'profile'
const PAGE_TITLE = 'Get started - Profile'

const Profile = props => {
  const generateHandler = fieldName => {
    return event => {
      props.handleProfileInputChange(fieldName, event.target.value)
    }
  }

  if (!props.profile.isInitialized || props.profile.isLoading) {
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />
  }

  if (!props.profile.id) {
    return (
      <div>
        User is not found [work in progress, please start again at register, to
        create new user]
      </div>
    )
  }

  return (
    <div className={css.registrationForm}>
      <form onSubmit={props.handleSubmit}>
        <h1 className={css.registrationFormHeader}>Tell us about you</h1>

        <FormField fullWidth className={css.formControl}>
          <InputLabel htmlFor="speaker-location">City</InputLabel>
          <Select
            value={props.profile.location}
            onChange={generateHandler('location')}
            input={<Input name="location" id="location" />}
          >
            {props.locations &&
              props.locations.map((location, index) => (
                <MenuItem key={index} value={location.id}>
                  {location.city}
                </MenuItem>
              ))}
          </Select>
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <TextField
            required
            label="First Name"
            onChange={generateHandler('first_name')}
            InputLabelProps={{ required: false }}
          />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <TextField
            required
            label="Last Name"
            onChange={generateHandler('last_name')}
            InputLabelProps={{ required: false }}
          />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormLabel component="legend">Do you identify as a woman?</FormLabel>
          <RadioGroup
            aria-label="woman"
            name="woman"
            value={
              props.profile.woman === null
                ? 'true'
                : props.profile.woman.toString()
            }
            onChange={generateHandler('woman')}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormLabel component="legend">
            Do you identify as a person of color?
          </FormLabel>
          <RadioGroup
            aria-label="poc"
            name="poc"
            value={
              props.profile.poc === null ? 'true' : props.profile.poc.toString()
            }
            onChange={generateHandler('poc')}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormLabel component="legend">
            Do you identify as a member of the LGBTQA+ community?
          </FormLabel>
          <FormHelperText>
            The response of this question will not appear publicly. We will use
            this information internally to provide you with opportunities and
            promotions tailored specifically to LGBTQA+ folks.
          </FormHelperText>
          <RadioGroup
            aria-label="lgbtqa"
            name="lgbtqa"
            value={
              props.profile.lgbtqa === null
                ? 'null'
                : props.profile.lgbtqa.toString()
            }
            onChange={generateHandler('lgbtqa')}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="No"
            />
            <FormControlLabel
              value="null"
              control={<Radio color="primary" />}
              label="Prefer not to answer"
            />
          </RadioGroup>
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormLabel component="legend">What pronouns do you use?</FormLabel>
          <RadioGroup
            aria-label="pronouns"
            name="pronouns"
            value={props.profile.pronouns || 'they'}
            onChange={generateHandler('pronouns')}
          >
            <FormControlLabel
              value="they"
              control={<Radio color="primary" />}
              label="They, them, their"
            />
            <FormControlLabel
              value="she"
              control={<Radio color="primary" />}
              label="She, her, her"
            />
            <FormControlLabel
              value="he"
              control={<Radio color="primary" />}
              label="He, him, his"
            />
          </RadioGroup>
        </FormField>

        <FormField className={css.formControl}>
          <FormLabel component="legend">Upload your photo</FormLabel>
          <ImageUpload />
        </FormField>

        <div>
          <FormField className={css.formControl}>
            <StyledButton label="Submit" type="submit" color="primary">
              Save and continue
            </StyledButton>
          </FormField>
        </div>
      </form>
    </div>
  )
}

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    props.getLocations()
    props.onChangeProfile({ current_page: CURRENT_PAGE })
  }

  render() {
    const props = this.props

    return (
      <DefaultLayout title={PAGE_TITLE} {...this.props}>
        <Profile
          handleSubmit={event => {
            event.preventDefault()
            // cannot be the default image
            // if (this.props.profile.image.startsWith('data:image/svg+xml;base64')) {
            //   return this.props.showNotification('Please upload a photo.');
            // }
            props.updateProfile()
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value })
          }}
          {...props}
        />
      </DefaultLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    locations: state.location.locations,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    getLocations: () => {
      dispatch(getLocations())
    },
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs))
    },
    updateProfile: () => {
      dispatch(updateProfile())
    },
    showNotification: message => {
      dispatch(showNotification(message))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
