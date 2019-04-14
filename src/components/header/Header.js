// NPM
import React, { Component } from 'react';
import { navigate } from 'gatsby';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import capitalize from 'lodash/capitalize';

// APP
import { fetchSpeakers, updateSearchParams } from 'appRedux/modules/speaker';
import { get as fetchTopics } from 'appRedux/modules/topic';
import { searchForm } from 'appAssets/css/styles.module.css';

import css from 'appAssets/css/header.module.css';

import Autocomplete from 'appCommon/Autocomplete';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.searchParams.q || '' };
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchParams.q !== prevProps.searchParams.q) {
      const query = this.props.searchParams.q || '';
      this.setState({ query });
    }
  }

  debouncedFetchSpeakers = debounce(
    searchParams =>
      this.props.fetchSpeakers({ ...searchParams, q: this.state.query }),
    750
  );

  fetchNewSpeakers = input => {
    const query = input;
    if (query === '') {
      this.props.updateSearchParams({
        q: query,
        offset: 0,
        limit: 20,
        append: false,
      });
    }
    this.setState({ query }, () => {
      this.debouncedFetchSpeakers(this.props.searchParams);
    });
  };

  searchProfiles = query => {
    const home = '/';
    if (this.props.location.pathname !== home) {
      navigate(home);
    }
    this.props.updateSearchParams({
      q: query,
      offset: 0,
      limit: 20,
      append: false,
    });
  };

  mapSpeakers = speakers =>
    speakers.map(speaker => {
      const cleanName = str =>
        encodeURIComponent(str.trim().replace(/\W+/g, '-'));
      const speakerProfilePath = `/speakers/${speaker.id}/${cleanName(
        speaker.display_name
      )}`;

      return {
        label: speaker.display_name,
        id: speaker.id,
        key: `${speaker.display_name}_${speaker.id}`,
        onClick: () => {
          navigate(speakerProfilePath);
        },
      };
    });

  render() {
    const topicSuggestions = this.props.topics.map(topic => ({
      label: capitalize(topic.topic),
      id: topic.id,
      key: `${topic.topic}_${topic.id}`,
      onClick: () => {
        this.searchProfiles(topic.topic);
      },
    }));
    const speakerSuggestions =
      this.props.speakers.length > 0
        ? this.mapSpeakers(this.props.speakers)
        : this.mapSpeakers(this.props.allSpeakers);

    const suggestions = [...topicSuggestions, ...speakerSuggestions];

    return (
      <Grid container justify="center" className={css.banner} spacing={0}>
        <Grid item xs={10} md={8}>
          <h2 className={css.headline}>
            Find talented{' '}
            <span className={css.highlight}>women and people of color</span>{' '}
            available for speaking opportunities at tech-related events.
          </h2>
          <Hidden smDown>
            <div className={`${searchForm} ${css.searchForm}`}>
              <Hidden only="xs">
                <SearchIcon className={css.searchIcon} />
              </Hidden>
              <Autocomplete
                suggestions={suggestions}
                onStateChange={this.fetchNewSpeakers}
                placeholder="Search for speakers or topics"
              />
            </div>
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
    fetchSpeakers: params => {
      dispatch(fetchSpeakers(params));
    },
    fetchTopics: () => {
      dispatch(fetchTopics());
    },
  };
}

function mapStateToProps(state) {
  return {
    searchParams: state.speaker.searchParams,
    topics: state.topic.topics,
    speakers: state.speaker.results,
    allSpeakers: state.speaker.allResults,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
