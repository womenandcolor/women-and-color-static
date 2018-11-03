import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpeaker } from 'appRedux/modules/speaker';
import Grid from '@material-ui/core/Grid';
import ReactLoading from 'react-loading';
import queryString from 'query-string';

// App
import SpeakerCard from 'appComponents/speakers/SpeakerCard';
import SpeakerInfo from 'appComponents/speakers/SpeakerInfo';
import FeaturedTalks from 'appComponents/speakers/FeaturedTalks';
import ContactSpeakerForm from 'appComponents/speakers/ContactSpeakerForm';
import Header from 'appComponents/header/Header';
import DefaultLayout from 'appComponents/layouts/Default';
import { showNotification } from 'appRedux/modules/notification';

const Speaker = props => {
  const { speaker, ...rest } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header location={rest.location} />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <SpeakerCard speaker={speaker} />
          </Grid>
          <Grid item xs={12} md={8}>
            {speaker.description && <SpeakerInfo speaker={speaker} />}
            {(!!speaker.featured_talks.length) && <FeaturedTalks talks={speaker.featured_talks} />}
            <ContactSpeakerForm speaker={speaker} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

class SpeakerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const parsedParams = queryString.parse(this.props.location.search)
    if (parsedParams.id) {
      this.props.getSpeaker(parsedParams.id)
    } else {
      this.props.showNotification('You must provide a speaker ID to preview their profile, i.e. www.womenandcolor.com/profile/preview?id=99')
    }
  }

  generateTitle = (speaker, profile) => {
    const model = speaker || profile;
    const firstName = model.first_name || "Speaker";
    const lastName = model.last_name || "Profile";
    const position = model.position || "undisclosed position";
    const organization = model.organization || "undisclosed organization";


    return `${firstName} ${lastName}, ${position} at ${organization}`
  }

  generateDescription = speaker => {
    if (speaker) {
      const threeTopics = speaker.topics.slice(0,2).map(topic => topic.topic).join(', ')
      return `${speaker.first_name} ${speaker.last_name} is available for speaking opportunities at tech-related events on ${threeTopics} and more.`
    }

    return 'Find talented diverse speakers for tech-related events'
  }

  render() {
    const { speaker, ...rest } = this.props;
    const title = this.generateTitle(speaker, {});
    const description = this.generateDescription(speaker);

    return(
      <div>
        <DefaultLayout title={title} description={description} {...this.props}>
        {
          this.props.speaker ? (
            <Speaker speaker={this.props.speaker} {...rest} />
          ) : (
            <ReactLoading type="spinningBubbles" color="#E5E8F4" />
          )
        }
        </DefaultLayout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    speaker: state.speaker.speaker,
    notification: state.notification.message,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getSpeaker: (id) => {
      dispatch(getSpeaker(id));
    },
    showNotification: (message) => {
      dispatch(showNotification(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerContainer);
