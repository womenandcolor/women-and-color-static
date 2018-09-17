// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// App
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile';
import {
  get as getTopics,
  create as createTopic,
} from 'appRedux/modules/topic';
import { showNotification } from 'appRedux/modules/notification';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import TopicSelector from 'appCommon/TopicSelector';
import DefaultLayout from '../../components/layouts/Default';

import css from 'appAssets/css/onboarding.module.css';

const CURRENT_PAGE = 'work';
const PAGE_TITLE = "Get started - Work"

const Work = props => {
  const generateHandler = fieldName => {
    return event => {
      props.handleProfileInputChange(fieldName, event.currentTarget.value);
    };
  };

  const handleTopicsChange = topics => {
    props.handleProfileInputChange('topics', topics);
  };

  return (
    <div className={css.registrationForm}>
      <form onSubmit={props.handleSubmit}>
        <h1 className={css.registrationFormHeader}>Let's talk about work</h1>

        <FormField fullWidth className={css.formControl}>
          <TextField label="Position" onChange={generateHandler('position')} />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <TextField
            label="Organization"
            onChange={generateHandler('organization')}
          />
        </FormField>

        <FormField fullWidth className={css.formControl}>
          <FormLabel component="legend">Speaking Topics</FormLabel>
          <TopicSelector
            topics={props.topics}
            selectedTopics={props.profile.topics}
            handleChange={handleTopicsChange}
            createTopic={props.createTopic}
          />
          <FormHelperText>
            {`Topics: ${props.profile.topics.length || '0'} of 10`}
          </FormHelperText>
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
  );
};

class WorkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.getTopics();
    props.onChangeProfile({ current_page: CURRENT_PAGE });
  }

  render() {
    return (
      <DefaultLayout title={PAGE_TITLE} {...this.props}>
        <Work
          handleSubmit={event => {
            event.preventDefault();
            if (this.props.profile.topics.length < 1) {
              return this.props.showNotification(
                'Please enter at least one topic.'
              );
            }
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
    topics: state.topic.topics,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
    getTopics: () => {
      dispatch(getTopics());
    },
    createTopic: topic => {
      dispatch(createTopic(topic));
    },
    showNotification: message => {
      dispatch(showNotification(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkContainer);
