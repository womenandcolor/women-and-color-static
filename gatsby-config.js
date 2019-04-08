const dotenv = require('dotenv')

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Women and Color',
    description:
      'Find talented women and people of color available for speaking opportunities at tech-related events.',
    siteUrl: process.env.WEBSITE_URL,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Women and Color',
        short_name: 'Women and Color',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#283ca7',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-drift',
      options: {
        appId: 'nbcmwsp2pvff',
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-76994229-1`,
        head: false,
        anonymize: true,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-rollbar',
      options: {
        accessToken: 'f9239110d8ed4032acc4fee19344adcf',
        // For all configuration options, see https://docs.rollbar.com/v1.0.0/docs/rollbarjs-configuration-reference
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: 'production',
        },
      },
    },
  ],
}
