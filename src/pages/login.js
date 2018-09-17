// Project
import React  from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// App
import {
  onChange as onChangeUser,
  login as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from '../components/layouts/AccountFormContainer';
import DefaultLayout from '../components/layouts/Default';

import css from 'appAssets/css/accounts.module.css';

const PAGE_TITLE = "Log in"

const Login = ({ handleUserInputChange, handleSubmit, ...rest}) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <DefaultLayout title={PAGE_TITLE} { ...rest }>
      <AccountFormContainer>
        <form onSubmit={ handleSubmit }>
          <h1 className={css.title}>{PAGE_TITLE}</h1>

          <FormField fullWidth>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
          </FormField>

          <FormField fullWidth>
            <TextField label="Password" type="password" onChange={ generateHandlerUser('password') } />
          </FormField>

          <Grid container justify="space-between" className={css.actions}>
            <Grid item>
              <Link to={'/reset-password'}>Forgot your password?</Link>
            </Grid>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Submit</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
      <Grid container justify="center">
        <Grid item xs={11} sm={8} md={5}>
          <p className={css.loginRegisterPrompt}>If you have not created an account yet, then please <Link to="/register">sign up</Link> first.</p>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}


const LoginContainer = props => {
  return(
    <Login
      handleSubmit={event => {
        event.preventDefault();
        props.submitForm(props.user);
      }}
      handleUserInputChange={(field, value) => {
        props.onChangeUser({ [field]: value })
      }}
      {...props}
    />
  )
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
    submitForm: (user) => {
      dispatch(submitForm(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
