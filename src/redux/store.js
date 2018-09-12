// NPM
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory'

// App
import appReducers  from '../redux/reducers';

export const history = createHashHistory()
const initialState = {
  authentication: {
    isLoggedIn: false
  }
}

const store = createStore(
  appReducers,
  initialState,
  compose(
    applyMiddleware(
      thunk,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;


