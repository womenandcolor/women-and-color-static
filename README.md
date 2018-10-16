# Women and Color - Frontend

Women and Color is an online community of subject matter experts who identify as women and/or people of color.

Located in cities across Canada and the United States, each of our subject matter experts is available for speaking opportunities at tech-related events.

## Tech Stack

The frontend is built on the [Gatsby][gatsby] framework, using [React][react] and [Redux][redux].

We use the [Material-UI][material-ui] component library, as well as [CSS Modules][css-modules] for styling.

The backend is build on Django and is a separate app. The repo and instructions for running it locally are here: [women-and-color-backend][backend-code].

## Getting Started

- Install the Gatsby CLI:
```sh
yarn global add gatsby-cli
```
- Install the project dependencies: `yarn`. (See the [installation instructions][yarn-installation] if you don't have `yarn` installed)
- Start the [backend server](backend-code)
- Start the frontend in development mode:
```sh
yarn start
```
- open `localhost:8080` on your browser to see the app

## Bridge Contributors!! 

### Using Git

- The `feature` branch should be your base branch for this project. 
- To contribute, you can either clone or fork this repo, then create your own branch off of the `feature` branch. Make your changes on that branch, then open a pull request back into the `feature` branch. Once your PR is approved and the code is merged, pull from `feature` and start a new branch for the next step in your development process.
- Whenever a new commit is made on the `feature` branch, it gets automatically deployed to Heroku, so you can see the live app here: https://job-board-bridge.herokuapp.com.

### Developing with Gatsby

Gatsby is a static site builder framework that uses React and GraphQL. They have great [documentation][gatsby], make sure to check it out. Basically, you develop your app in React and Gatsby takes care of compiling the javascript and rendering it into a static site that can deployed anywhere as a set of HTML, CSS, and JS files. 

#### Routing and adding new pages

Gatsby handles routing, and the routes are based on the structure of the `/src/pages` directory. So to create a new page at womenandcolor.com/job-board, you would need to create a component at `/src/pages/job-board.js` that renders the content of that page. You can create sub-directories, so if you wanted a page at the url womenandcolor.com/jobs/new, you'd create a component at /src/pages/jobs/new.js'. Then when you run `yarn start`, Gatsby will generate those routes for you.

An important "gotcha" with Gatsby is that since it's rendered server-side, there can't be any references to the DOM or `window` or any other browser API that wouldn't be available in a node environment. It's easy to get tripped up because those errors won't come up in development mode, you'll only see them when you run `yarn build` to build the app for production. 

There are two ways to bring data into a component when building with Gatsby - either you provide the data at build-time and use a graphQL query to pull it into your component, or you fetch the data after the component mounts and update the state with the data so the component re-renders. The more React-y way to do it is the second option, but if you want to try the graphQL way you can find the documentation here: https://www.gatsbyjs.org/docs/querying-with-graphql and you can see an example here: https://github.com/womenandcolor/women-and-color-static/blob/master/src/components/templates/speaker.js

### Using Redux

Redux is already set up in the app, so just add your modules to the `/src/redux/modules` directory and just make sure you include the reducer in `/src/redux/reducers.js/`



<!-- Links -->
   [gatsby]: https://www.gatsbyjs.org/
   [backend-code]: https://github.com/womenandcolor/women-and-color-backend/
   [react]: https://reactjs.org/
   [redux]: https://redux.js.org/
   [material-ui]: https://material-ui.com/
   [css-modules]: https://github.com/css-modules/css-modules
   [yarn-installation]: https://yarnpkg.com/en/docs/install#mac-stable
