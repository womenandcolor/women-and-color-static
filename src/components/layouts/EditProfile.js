import React from 'react';
import Grid from '@material-ui/core/Grid';

// App
import SideBar from 'appComponents/profile/SideBar';
import DefaultLayout from './Default';
import css from 'appAssets/css/profile.module.css'

const EditProfile = props => {
  return (
    <DefaultLayout location={props.location}>
      <Grid container justify="center">
        <Grid item xs={11} md={8}>
          <Grid container className={css.editProfileContainer} spacing={24}>
            <Grid item xs={12} md={3}>
              <SideBar location={props.location} />
            </Grid>
            <Grid item xs={12} md={9}>
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default EditProfile;