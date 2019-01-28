// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { find } from 'lodash';
import { Helmet } from 'react-helmet'

// APP
import SpeakerList from '../components/speakers/SpeakerList';
import Filters from '../components/speakers/Filters';
import MobileFilters from '../components/speakers/MobileFilters';
import MobileSearch from '../components/speakers/MobileSearch';
import Header from '../components/header/Header';
import { fetchSpeakers, updateSearchParams } from 'appRedux/modules/speaker';
import { get as getLocations } from 'appRedux/modules/location';
import { DEFAULT_SPEAKER_LIMIT } from 'appHelpers/constants';
import DefaultLayout from '../components/layouts/Default';

import css from 'appAssets/css/index.module.css';
import ogImage from 'appAssets/images/opengraph.jpg';

const PAGE_TITLE = "Women and Color"

const searchParamsToSpeakerIdentity = ({ poc, woman }) => {
  if (!poc && !woman) {
    return 'All speakers';
  } else {
    const genderIdentityString = woman ? 'Women' : 'People';
    const pocIdentityString = poc ? 'of color' : '';
    return `${genderIdentityString} ${pocIdentityString}`;
  }
};

const Home = ({
  searchParams,
  locations,
  speakers,
  endOfResults,
  loadMoreSpeakers,
  isLoading,
  ...rest
}) => {
  const searchQuery = searchParams.q ? `'${searchParams.q}'` : 'all topics';
  const locationObj = find(locations, { id: parseInt(searchParams.location) })
  const location = locationObj
    ? locationObj.city
    : 'all cities';
  const speakerIdentity = searchParamsToSpeakerIdentity(searchParams);

  return (
    <DefaultLayout title={PAGE_TITLE} {...rest} >
      <Helmet>
        <meta name="google-site-verification" content="NQzKjXT5c_JQDVaZVgknGWG_gLQdfr7cF68EpsKYmbs" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.womenandcolor.com/" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content="Find talented women and people of color available for speaking opportunities at tech-related events." />
      </Helmet>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12}>
          <Header location={rest.location} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={0}>
            <Hidden smDown>
              <Grid item md={3} className={css.filtersContainer}>
                <Filters locations={locations} selectedLocation={locationObj} />
              </Grid>
            </Hidden>

            <Hidden mdUp>
              <Grid item xs={12}>
                <MobileSearch location={rest.location} />
                <MobileFilters locations={locations} />
              </Grid>
            </Hidden>

            <Grid item xs={12} md={9}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <div className={css.contentTitles}>
                    {`${speakerIdentity} in ${location} for ${searchQuery}`}
                  </div>
                </Grid>
              </Grid>
              <SpeakerList
                speakers={speakers}
                endOfResults={endOfResults}
                loadMoreSpeakers={loadMoreSpeakers}
                location={rest.location}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.getLocations({ active: true });
    this.props.fetchSpeakers(this.props.searchParams);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchParams !== prevProps.searchParams) {
      this.props.fetchSpeakers(this.props.searchParams);
    }
  }

  loadMoreSpeakers = () => {
    this.props.updateSearchParams({
      limit: DEFAULT_SPEAKER_LIMIT,
      offset: this.props.searchParams.offset + DEFAULT_SPEAKER_LIMIT,
      append: true,
    });
  };

  render() {
    return(
      <Home loadMoreSpeakers={this.loadMoreSpeakers} {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    speakers: state.speaker.results,
    locations: state.location.locations,
    searchParams: state.speaker.searchParams,
    endOfResults: state.speaker.endOfResults,
    isLoading: state.speaker.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSpeakers: params => {
      dispatch(fetchSpeakers(params));
    },
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
    getLocations: (opts) => {
      dispatch(getLocations(opts));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
