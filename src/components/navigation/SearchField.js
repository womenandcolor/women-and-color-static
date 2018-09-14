// NPM
import React, { Component } from 'react'
import { navigate } from 'gatsby'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'

// APP
import { updateSearchParams } from 'appRedux/modules/speaker';
import css from 'appAssets/css/navigation.module.css';
import { searchForm, hideOnMobile } from 'appAssets/css/styles.module.css';


class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.q || '' }
  }

  searchProfiles = (event) => {
    event.preventDefault();
    const query = this.state.query;
    const home = '/'
    if (this.props.location.pathname !== home) {
      navigate(home)
    }
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
      <div>
        <form onSubmit={this.searchProfiles} className={`${searchForm} ${hideOnMobile} ${css.searchForm}`}>
          <IconButton color="secondary" type="submit" className={css.searchButton}>
            <SearchIcon />
          </IconButton>
          <TextField
            fullWidth
            type="search"
            onChange={this.onChange}
            value={this.state.query}
            placeholder={'Search for speakers or topics'}
            InputProps={{ disableUnderline: true }}
          />
        </form>
      </div>
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
)(SearchField);
