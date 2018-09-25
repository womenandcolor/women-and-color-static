import React, { Component } from 'react';
import { graphql } from 'gatsby'
import { connect } from 'react-redux';
import { getSpeaker } from 'appRedux/modules/speaker';
import Grid from '@material-ui/core/Grid';
import ReactLoading from 'react-loading';
import Helmet from 'react-helmet';

// App
import SpeakerCard from 'appComponents/speakers/SpeakerCard';
import SpeakerInfo from 'appComponents/speakers/SpeakerInfo';
import FeaturedTalks from 'appComponents/speakers/FeaturedTalks';
import ContactSpeakerForm from 'appComponents/speakers/ContactSpeakerForm';
import Header from 'appComponents/header/Header';
import DefaultLayout from 'appComponents/layouts/Default';

const Speaker = props => {
  const { speaker } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header />
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
    this.props.getSpeaker(this.props.data.profile.profile_id)
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
    const { speaker } = this.props;
    const title = this.generateTitle(speaker, this.props.data.profile);
    const description = this.generateDescription(speaker);

    return(
      <DefaultLayout title={title} description={description} {...this.props}>
        <Helmet>
          <meta name="og:title" content={title} />
          <meta name="og:type" content='website' />
          <meta name="og:image" content={this.props.data.profile.image} />
          <meta name="og:url" content={`${process.env.GATSBY_URL_ORIGIN}${this.props.location.pathname}`} />
          <meta name="og:description" content={description} />
        </Helmet>
      {
        this.props.speaker ? (
          <Speaker speaker={this.props.speaker} />
        ) : (
          <ReactLoading type="spinningBubbles" color="#E5E8F4" />
        )
      }
      </DefaultLayout>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerContainer);

export const query = graphql`
  query SpeakerPageQuery($profile_id: Int!) {
    profile (profile_id: { eq: $profile_id }) {
      id
      profile_id
      display_name
      first_name
      last_name
      published
      status
      image
      user
    }
  }
`;
