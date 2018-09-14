// NPM
import React, { PropTypes, Component } from 'react'
// import {withRouter} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';

// APP
import StyledButton from 'appCommon/StyledButton';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { searchForm } from 'appAssets/css/styles.module.css';

import css from './header.module.css';


class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.q || '' }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.q !== newProps.q) {
      const query = newProps.q || '';
      this.setState({ query })
    }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const home = '/'
    if (this.props.history.location.pathname !== home) {
      this.props.history.push(home)
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
      if (this.props.history.location.pathname !== home) {
        this.props.history.push(home)
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
)(Banner);
