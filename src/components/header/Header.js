// NPM
import React, { Component } from 'react';
import { navigate } from 'gatsby';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { searchForm } from 'appAssets/css/styles.module.css';

import css from 'appAssets/css/header.module.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.q || '' }
  }

  componentDidUpdate(prevProps) {
    if (this.props.q !== prevProps.q) {
      const query = this.props.q || '';
      this.setState({ query })
    }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const home = '/'
    if (this.props.location.pathname !== home) {
      navigate(home)
    }
    const query = this.state.query;
    this.props.updateSearchParams({
      q: query,
      offset: 0,
      limit: 20,
      append: false
    })
  }

  onChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      const home = '/'
      if (this.props.location.pathname !== home) {
        navigate(home)
      }
      this.props.updateSearchParams({
        q: null,
        offset: 0,
        limit: 20,
        append: false
      })
    }
  }

  render() {
    return (
      <Grid container justify="center" className={css.banner} spacing={0}>
        <Grid item xs={10} md={8}>
          <h2 className={css.headline}>
            Find talented <span className={css.highlight}>women and people of color</span> available for speaking opportunities at tech-related events.
          </h2>
          <Hidden smDown>
            <form onSubmit={this.searchProfiles} className={`${searchForm} ${css.searchForm}`}>
              <Hidden only='xs'>
                <SearchIcon className={css.searchIcon} />
              </Hidden>
              <TextField
                fullWidth
                type="search"
                onChange={this.onChange}
                value={this.state.query}
                placeholder={'Search for speakers or topics'}
                InputProps={{ disableUnderline: true, style: { paddingRight: '1rem'} }}
              />
              <div>
                <StyledButton color="primary" type="submit" >
                  <Hidden smUp>
                    <SearchIcon />
                  </Hidden>
                  <Hidden only='xs'>
                    <span>Find Speakers</span>
                  </Hidden>
                </StyledButton>
              </div>
            </form>
          </Hidden>
        </Grid>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    }
  }
}

function mapStateToProps(state) {
  return {
    q: state.speaker.searchParams.q
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
