// Project
import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// App
import {
  onChange as onChangeUser,
  resetPassword as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from '../components/layouts/AccountFormContainer';
import DefaultLayout from '../components/layouts/Default';

import css from 'appAssets/css/accounts.module.css';

const ResetPassword = ({ handleUserInputChange, handleSubmit, ...rest }) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <DefaultLayout {...rest}>
      <AccountFormContainer>
        <form onSubmit={ handleSubmit }>
          <h1 className={css.title}>Reset your password</h1>
          <p>Forgot your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>

          <FormField fullWidth>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
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


const ResetPasswordContainer = props => {
  return(
    <div>
      <ResetPassword
        handleSubmit={event => {
          event.preventDefault();
          props.submitForm();
        }}
        handleUserInputChange={(field, value) => {
          props.onChangeUser({ [field]: value })
        }}
        {...props}
      />
    </div>
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
    submitForm: () => {
      dispatch(submitForm());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);
