import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';

import DefaultLayout from '../components/layouts/Default';
import css from 'appAssets/css/about.module.css';
import ogImage from 'appAssets/images/opengraph.jpg';

const PAGE_TITLE = 'About Us'

const AboutUs = (props) => {
  return(
    <DefaultLayout title={PAGE_TITLE} {...props}>
      <Helmet>
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.womenandcolor.com/" />
        <meta property="og:image" content={`https://www.womenandcolor.com${ogImage}`} />
        <meta property="og:description" content="Find talented women and people of color available for speaking opportunities at tech-related events." />
      </Helmet>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={css.header}>
            <Grid item xs={12} sm={10} md={6}>
              <h1 className={css.title}>We are frustrated with the lack of <span className={css.strong}>gender</span> and <span className={css.strong}>racial</span> representation at tech-related events.</h1>
            </Grid>
          </Grid>

          <Grid container justify="center" className={css.body}>
            <Grid item xs={12} sm={10} md={6}>
              <p>Women and Color is an online community of subject matter experts who identify as women and/or people of color.</p>
              <p>Located in cities across Canada and the United States, each of our subject matter experts is available for speaking opportunities at tech-related events.</p>
              <p>Interested in helping us build a more inclusive tech ecosystem? Send us an email at <span className={css.strong}>hello@womenandcolor.com</span>.</p>
              <p>Women and Color is built with passion in Toronto, ON, and is a federally incorporated not-for-profit in Canada.</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  )
}

export default AboutUs;