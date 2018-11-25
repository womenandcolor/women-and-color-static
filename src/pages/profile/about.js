// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';

// App
import {
  update as updateProfile,
  onChange as onChangeProfile,
} from 'appRedux/modules/profile';
import { get as getLocations } from 'appRedux/modules/location';
import {
  get as getTopics,
  create as createTopic,
} from 'appRedux/modules/topic';
import StyledButton from 'appCommon/StyledButton';
import TopicSelector from 'appCommon/TopicSelector';
import FormField from 'appCommon/FormField';
import ImageUpload from 'appCommon/ImageUpload';
import EditProfileLayout from 'appComponents/layouts/EditProfile';

import css from 'appAssets/css/profile.module.css';

const PAGE_TITLE = "Edit your profile"

const About = props => {
  const generateHandler = fieldName => event => {
    props.handleProfileInputChange(fieldName, event.currentTarget.value);
  };

  const handleLocationChange = event => {
    const selectedLocation = event.target.value;
    props.handleProfileInputChange('location', selectedLocation);
  };

  const handleTopicsChange = topics => {
    props.handleProfileInputChange('topics', topics);
  };

  if (!props.profile.isInitialized || props.profile.isLoading) {
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />
  }

  if (!props.profile.id) {
    return (
      <div>
        User is not found [work in progress, please start again at register, to
        create new user]
      </div>
    );
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={css.section}>
        <Grid container>
          <Grid item xs={12}>
            <ImageUpload />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                required
                label="First Name"
                value={props.profile.first_name}
                onChange={generateHandler('first_name')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                required
                label="Last Name"
                value={props.profile.last_name}
                onChange={generateHandler('last_name')}
              />
            </FormField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                required
                label="Position"
                value={props.profile.position}
                onChange={generateHandler('position')}
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                required
                label="Organization"
                value={props.profile.organization}
                onChange={generateHandler('organization')}
              />
            </FormField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <InputLabel htmlFor="speaker-location">City</InputLabel>
              <Select
                value={props.profile.location}
                onChange={handleLocationChange}
                input={<Input name="location" id="location" />}
              >
                {props.locations &&
                  props.locations.map((location, index) => {
                    return (
                      <MenuItem key={index} value={location.id}>
                        <ListItemText primary={location.city} />
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormField>
          </Grid>
          <Grid item xs={12}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                multiline
                rows={5}
                label="Bio"
                value={props.profile.description || ''}
                error={(!!props.profile.description) && (props.profile.description.length > 1000)}
                onChange={generateHandler('description')}
                aria-describedby="bio-error-text"
              />
              <FormHelperText id="bio-error-text">
                {`Characters: ${props.profile.description ? props.profile.description.length : '0'} (maximum 1000)`}
              </FormHelperText>
            </FormField>
          </Grid>
        </Grid>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                Do you identify as a woman?
              </FormLabel>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                Do you identify as a person of color?
              </FormLabel>
              <RadioGroup
                aria-label="poc"
                name="poc"
                value={
                  props.profile.poc === null
                    ? 'true'
                    : props.profile.poc.toString()
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                What pronouns do you use?
              </FormLabel>
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <FormLabel component="legend">
                Do you identify as a member of the LGBTQA+ community?
              </FormLabel>
              <FormHelperText>
                The response of this question will not appear publicly. We will use this information internally to provide you with opportunities and promotions tailored specifically to LGBTQA+ folks.
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
                  value="null"
                  control={<Radio color="primary" />}
                  label="Prefer not to answer"
                />
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
          </Grid>
        </Grid>
      </div>

      <div className={css.section}>
        <Grid item xs={12}>
          <FormLabel component="legend">Topics</FormLabel>
          <TopicSelector
            topics={props.topics}
            selectedTopics={props.profile.topics}
            handleChange={handleTopicsChange}
            createTopic={props.createTopic}
          />
          <FormHelperText>
            {`Topics: ${props.profile.topics.length || '0'} of 10`}
          </FormHelperText>
        </Grid>
      </div>

      <div className={css.section}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Twitter"
                value={props.profile.twitter || '@'}
                onChange={generateHandler('twitter')}
                placeholder='@twitterhandle'
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="LinkedIn"
                value={props.profile.linkedin || 'https://'}
                onChange={generateHandler('linkedin')}
                placeholder='https://www.linkedin.com'
              />
            </FormField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField fullWidth className={css.formControl}>
              <TextField
                label="Website"
                value={props.profile.website || 'https://'}
                onChange={generateHandler('website')}
                placeholder='https://www.yourwebsite.com'
              />
            </FormField>
          </Grid>
        </Grid>
      </div>

      <div className={css.sectionBorderless}>
        <FormField className={css.formControl}>
          <StyledButton label="Submit" type="submit" color="primary">
            Save changes
          </StyledButton>
        </FormField>
      </div>
    </form>
  );
};

class AboutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLocations();
    this.props.getTopics();
  }

  render() {
    const props = this.props;

    return (
      <EditProfileLayout title={PAGE_TITLE} {...props}>
        <div className={css.section}>
          <h1 className={css.header}>{PAGE_TITLE}</h1>
        </div>
        <About
          handleSubmit={event => {
            event.preventDefault();
            props.updateProfile();
          }}
          handleProfileInputChange={(field, value) => {
            props.onChangeProfile({ [field]: value });
          }}
          {...props}
        />
      </EditProfileLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    locations: state.location.locations,
    topics: state.topic.topics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLocations: () => {
      dispatch(getLocations());
    },
    getTopics: () => {
      dispatch(getTopics());
    },
    createTopic: topic => {
      dispatch(createTopic(topic));
    },
    onChangeProfile: attrs => {
      dispatch(onChangeProfile(attrs));
    },
    updateProfile: () => {
      dispatch(updateProfile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
