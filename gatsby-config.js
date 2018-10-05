module.exports = {
  siteMetadata: {
    title: 'Women and Color',
    description: 'Find talented women and people of color available for speaking opportunities at tech-related events.'
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
    'gatsby-plugin-offline'
  ],
}
