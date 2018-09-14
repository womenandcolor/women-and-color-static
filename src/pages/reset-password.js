// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import { Link } from 'gatsby';

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


class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <ResetPassword
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm();
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
    submitForm: () => {
      dispatch(submitForm());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);
