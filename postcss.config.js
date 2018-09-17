const cssvariables = require('postcss-css-variables')
const globalCssVars = require('./src/assets/css/cssVariables.js')

module.exports = () => ({
  plugins: () => [
    cssvariables({
      preserve: true,
      variables: globalCssVars
    })
  ],
})