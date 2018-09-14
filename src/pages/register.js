// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// App
import {
  onChange as onChangeUser,
  create as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from '../components/layouts/AccountFormContainer';
import DefaultLayout from '../components/layouts/Default'

import css from 'appAssets/css/accounts.module.css';

const CURRENT_PAGE = 'registration';

const Register = ({ handleSubmit, handleUserInputChange, ...rest }) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <DefaultLayout {...rest}>
      <AccountFormContainer>
        <form onSubmit={ handleSubmit }>
          <h1 className={css.title}>Sign up</h1>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
          </FormField>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Password" type="password" onChange={ generateHandlerUser('password1') } />
          </FormField>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Password Confirmation" type="password" onChange={ generateHandlerUser('password2') } />
          </FormField>

          <Grid container justify="space-between" className={css.actions}>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Create profile</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
      <Grid container justify="center">
        <Grid item xs={11} sm={8} md={5}>
          <p className={css.loginRegisterPrompt}>Already have an account? Then please <Link to="/login">sign in</Link>.</p>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}


class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.onChangeUser({ page: CURRENT_PAGE });
  }

  render() {
    return(
      <Register
        handleSubmit={event => {
          event.preventDefault();
          this.props.submitForm(this.props.user, CURRENT_PAGE);
        }}
        handleUserInputChange={(field, value) => {
          this.props.onChangeUser({ [field]: value })
        }}
        {...this.props}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    notification: state.notification.message
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeUser: (attrs) => {
      dispatch(onChangeUser(attrs))
    },
    submitForm: (user, page) => {
      dispatch(submitForm(user, page));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
