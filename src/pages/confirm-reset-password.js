// Project
import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';

// App
import {
  onChange as onChangeUser,
  confirmResetPassword as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from '../components/layouts/AccountFormContainer';
import DefaultLayout from '../components/layouts/Default';

import css from 'appAssets/css/accounts.module.css';
import ogImage from 'appAssets/images/opengraph.jpg';

import { Helmet } from 'react-helmet'
import { DEFAULT_PAGE_DESCRIPTION } from '../utils/constants';

const PAGE_TITLE = "Confirm reset password"

const ConfirmPasswordReset = ({ handleUserInputChange, handleSubmit, user, ...rest }) => {
  const generateHandler = (fieldName) => {
    return (event) => { handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return (
    <DefaultLayout title={PAGE_TITLE} {...rest}>
      <Helmet>
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.womenandcolor.com/" />
        <meta property="og:image" content={`https://www.womenandcolor.com${ogImage}`} />
        <meta property="og:description" content={DEFAULT_PAGE_DESCRIPTION} />
      </Helmet>
      <AccountFormContainer>
        <form onSubmit={handleSubmit}>
          <h1 className={css.title}>Enter your new password</h1>

          <FormField fullWidth className={css.formControl}>
            <TextField
              required
              label="New password"
              value={user.new_password1 || ''}
              type="password"
              onChange={generateHandler('new_password1')}
            />
          </FormField>

          <FormField fullWidth className={css.formControl}>
            <TextField
              required
              label="Confirm new password"
              value={user.new_password2 || ''}
              type="password"
              onChange={generateHandler('new_password2')}
            />
          </FormField>

          <Grid container justify="flex-start" className={css.actions}>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Submit</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
    </DefaultLayout>
  )
}


class ConfirmPasswordResetContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const parsedParams = queryString.parse(this.props.location.search)
    this.setState({ uid: parsedParams.uid, token: parsedParams.token })
  }

  render() {
    return (
      <div>
        <ConfirmPasswordReset
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.state.uid, this.state.token);
          }}
          handleUserInputChange={(field, value) => {
            this.props.onChangeUser({ [field]: value })
          }}
          {...this.props}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeUser: (attrs) => {
      dispatch(onChangeUser(attrs))
    },
    submitForm: (uid, token) => {
      dispatch(submitForm(uid, token));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPasswordResetContainer);
