// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { navigate } from 'gatsby';
import { Helmet } from 'react-helmet';
import { find, remove } from 'lodash';

// App
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile';
import { get as getSubscriptionGroups } from 'appRedux/modules/subscriptionGroup'
import { showNotification } from 'appRedux/modules/notification';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import DefaultLayout from '../../components/layouts/Default';

import css from 'appAssets/css/onboarding.module.css';

const Communication = props => {
  const group_options = props.subscription_groups || [];

  const handleSubscriptionGroups = (e) => {
    const group = find(props.subscription_groups, g => g.group_id === e.target.value)
    let selectedGroups = [...props.profile.subscription_groups];

    if (e.target.checked) {
      selectedGroups.push(group);
    } else {
      remove(selectedGroups, g => g.group_id === group.group_id);
    }

    props.handleProfileInputChange('subscription_groups', selectedGroups);
  }

  return (
    <div className={css.registrationForm}>
      <form onSubmit={props.handleSubmit}>
        <h1 className={css.registrationFormHeader}>Stay in touch</h1>
        <FormField fullWidth className={css.formControl}>
          <label>What can we contact you about?</label>

          {
            group_options.map(group => {
              const checked = find(props.profile.subscription_groups, g => g.group_id === group.group_id)
              return (
                <FormControlLabel
                  key={group.group_id}
                  control={
                    <Checkbox
                      checked={Boolean(checked)}
                      onChange={handleSubscriptionGroups}
                      value={group.group_id}
                      color="primary"
                    />
                  }
                  label={group.label}
                />
              )
            })
          }
        </FormField>

        <FormField className={css.formControl}>
          <StyledButton label="Save communication settings" type="submit" color="primary">
            Save
          </StyledButton>
        </FormField>
      </form>
    </div>
  );
};

class CommunicationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.onChangeProfile({ current_page: null });
  }

  componentDidMount() {
    this.props.getSubscriptionGroups();
  }

  render() {
    return (
      <DefaultLayout {...this.props}>
        <Helmet>
          <title>Get started - Communication</title>
          <meta
            name="description"
            content="Create your profile on Women and Color"
          />
        </Helmet>
        <Communication
          handleSubmit={event => {
            event.preventDefault();
            this.props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            this.props.onChangeProfile({ [field]: value });
          }}
          {...this.props}
        />
      </DefaultLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    subscription_groups: state.subscriptionGroup.groups,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile()).then(() => {
       navigate('/profile')
      });
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
    getSubscriptionGroups: () => {
      dispatch(getSubscriptionGroups());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationContainer);
