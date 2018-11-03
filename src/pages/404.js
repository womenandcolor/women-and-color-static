import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';

import DefaultLayout from '../components/layouts/Default';
import css from 'appAssets/css/about.module.css';

const PAGE_TITLE = 'Page Not Found'

const NotFound = (props) => {
  return(
    <DefaultLayout title={PAGE_TITLE} {...props}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={css.header}>
            <Grid item xs={12} sm={10} md={6}>
              <h1 className={css.title}>Page not found</h1>
            </Grid>
          </Grid>

          <Grid container justify="center" className={css.body}>
            <Grid item xs={12} sm={10} md={6}>
              <Link to="/">Back to the home page</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default NotFound;

