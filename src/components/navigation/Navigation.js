// NPM
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App
import MenuDropdown from './MenuDropdown';
import ButtonMenu from './ButtonMenu';
import Logo from '../../assets/images/logo_women_and_color.svg';
import { logout, validateToken } from 'appRedux/modules/user';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary.dark,
  },
});

const loggedOutMenuItems = {
  default: [
    { title: 'Log in', slug: '/login', color: 'secondary' },
    { title: 'Be a speaker', slug: '/register', color: 'primary' },
  ],
};

const cleanName = str => encodeURIComponent(str.trim().replace(/\W+/g, '-'));

const loggedInMenuItems = profile => {
  const viewProfileButton =
    profile.status === 'approved'
      ? {
          title: 'View profile',
          slug: `/speakers/${profile.id}/${cleanName(profile.display_name)}`,
          color: 'primary',
        }
      : {
          title: 'Preview profile',
          slug: `/profile/preview?id=${profile.id}`,
          color: 'primary',
        };

  return {
    default: [
      { title: 'Edit profile', slug: '/profile/about/', color: 'primary' },
    ],
    '/profile/about/': [viewProfileButton],
    '/profile/talks/': [viewProfileButton],
    '/profile/account/': [viewProfileButton],
    '/profile/communication/': [viewProfileButton],
  };
};

class Navigation extends Component {
  componentDidMount() {
    this.props.validateToken();
  }

  menuItemsList = (location, authed, profile) => {
    const menuItemsObj = authed
      ? loggedInMenuItems(profile)
      : loggedOutMenuItems;

    if (location && menuItemsObj[location.pathname]) {
      return menuItemsObj[location.pathname];
    }

    return menuItemsObj.default;
  };

  render() {
    const { classes, location, user, profile, logout } = this.props;

    const menuItems = this.menuItemsList(
      location,
      user.isAuthenticated,
      profile
    );

    return (
      <div>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar>
            <Grid container justify="center" spacing={0}>
              <Grid item xs={12} md={9}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={6} sm={4} md={3}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                      <img
                        src={Logo}
                        height="50px"
                        width="100%"
                        alt={'Women and Color logo'}
                      />
                    </a>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Grid container justify="flex-end">
                      <Hidden smDown>
                        <ButtonMenu
                          menuItems={menuItems}
                          authed={user.isAuthenticated}
                          logout={logout}
                        />
                      </Hidden>
                      <Hidden mdUp>
                        <MenuDropdown
                          menuItems={menuItems}
                          authed={user.isAuthenticated}
                          logout={logout}
                          location={location}
                        />
                      </Hidden>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    },
    validateToken: () => {
      dispatch(validateToken());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navigation));
