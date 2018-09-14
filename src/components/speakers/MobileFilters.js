// NPM
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// APP
import css from 'appAssets/css/index.module.css';
import { updateSearchParams, fetchSpeakers } from 'appRedux/modules/speaker';
import { DEFAULT_SPEAKER_LIMIT } from 'appHelpers/constants';
import Filters from './Filters'
import StyledButton from 'appCommon/StyledButton';

const styles = {
  closeButton: {
    textAlign: 'right',
  },
  paper: {
    width: '100%',
    padding: '1rem'
  },
};

class MobileFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: {}, openModal: false };
  }

  createLocationDict = (locations, dict) => {
    locations.map(location => {
      const country = location.country.toLowerCase();
      if (!dict[country]) {
        dict[country] = [];
      }
      return dict[country].push(location);
    });

    return dict;
  };

  toggleCountry = country => {
    this.setState({
      expand: {
        [country]: !this.state.expand[country],
      },
    });
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleSelectCity = location => {
    this.props.updateSearchParams({
      location: location,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false,
    });
  };

  handleSelectIdentity = identity => {
    this.props.updateSearchParams({
      ...identity.value,
      offset: 0,
      limit: DEFAULT_SPEAKER_LIMIT,
      append: false,
    });
  };

  render() {
    return (
      <div>
        <div className={css.filterLabel} onClick={this.handleOpen}>
          <IconButton onClick={this.handleOpen} aria-haspopup="true">
            <FilterList />
          </IconButton>
          <span>Filter results</span>
        </div>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}
        >
          <Paper className={this.props.classes.paper}>
            <Grid container>
              <Grid item xs={12} style={styles.closeButton}>
                <Grid container justify="space-between" className={css.filterLabelContainer}>
                  <Grid item className={`${css.filterLabel} ${css.filterOpen}`}>
                    <FilterList />
                    <span>Filter results</span>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={this.handleClose}>
                      <Close />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Filters locations={this.props.locations} />
                <StyledButton onClick={this.handleClose} color="primary">
                  Update results
                </StyledButton>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLocation: state.speaker.selectedLocation,
    selectedIdentity: state.speaker.selectedIdentity,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearchParams: params => {
      dispatch(updateSearchParams(params));
    },
    fetchSpeakers: params => {
      dispatch(fetchSpeakers(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MobileFilters)
);
