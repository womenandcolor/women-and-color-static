/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');


exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        appCommon: path.resolve(__dirname, 'src/components/common/'),
        appPages: path.resolve(__dirname, 'src/pages/'),
        appConfig: path.resolve(__dirname, 'src/config/'),
        appRedux: path.resolve(__dirname, 'src/redux/'),
        appHelpers: path.resolve(__dirname, 'src/utils/'),
        appAssets: path.resolve(__dirname, 'src/assets/'),
      },
    },
  })
}