# Women and Color - Frontend

Women and Color is an online community of subject matter experts who identify as women and/or people of color.

Located in cities across Canada and the United States, each of our subject matter experts is available for speaking opportunities at tech-related events.

## Tech Stack

The front end is built on the [Gatsby][gatsby] framework, using [React][react] and [Redux][redux].

We use the [Material-UI][material-ui] component library, as well as [CSS Modules][css-modules] for styling.

The API is build on Django and is a separate app. The repo and instructions for running it locally are here: [women-and-color-backend][backend-code].

## Install the Gatsby CLI

With NPM:
```sh
npm install --global gatsby-cli
```
With Yarn:
```sh
yarn global add gatsby-cli
```

## Getting Started

- Clone the repo and install dependencies with `yarn`. (See the [installation instructions][yarn-installation] if you don't have `yarn` installed)
- Start the [backend server](backend-code)
- Build and run the frontend:
```sh
yarn develop
```

<!-- Links -->
   [gatsby]: https://www.gatsbyjs.org/
   [backend-code]: https://github.com/womenandcolor/women-and-color-backend/
   [react]: https://reactjs.org/
   [redux]: https://redux.js.org/
   [material-ui]: https://material-ui.com/
   [css-modules]: https://github.com/css-modules/css-modules
   [yarn-installation]: https://yarnpkg.com/en/docs/install#mac-stable