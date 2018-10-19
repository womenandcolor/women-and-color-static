/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const res = await axios.get(`${process.env.GATSBY_API_URL}/profiles/`)

  const processProfile = profile => {
    const nodeId = createNodeId(`profile-${profile.id}`)
    const nodeContent = JSON.stringify(profile)
    const nodeContentDigest = crypto
      .createHash("md5")
      .update(nodeContent)
      .digest("hex")

    const nodeData = Object.assign({}, profile, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Profile`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
      profile_id: profile.id,
    })

    return nodeData
  }

  if (res.data.length > 0) {
    res.data.forEach(profile => createNode(processProfile(profile)))
  }

  return
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `query {
          allProfile (filter: { published: { eq: true } }) {
            edges {
              node {
                id
                profile_id
                display_name
                first_name
                last_name
                published
                status
                image
                user
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allProfile.edges.forEach(({ node }) => {
          const template = path.resolve(
            `src/components/templates/speaker.js`
          );

          const cleanName = str => encodeURIComponent(str.trim().replace(/\W+/g, '-'))
          const speakerPath = `/speakers/${node.profile_id}/${cleanName(node.display_name)}`

          createPage({
            path: speakerPath,
            component: template,
            context: {
              profile_id: node.profile_id,
              display_name: node.display_name,
              image: node.image,
            },
          })
        })
      })
    )
  })
}

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
        appComponents: path.resolve(__dirname, 'src/components/'),
      },
    },
  })
}