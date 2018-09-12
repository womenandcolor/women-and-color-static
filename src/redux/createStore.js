import { createStore as reduxCreateStore } from "redux"
import { applyMiddleware } from "redux"
import appReducers from './reducers'
import thunk from 'redux-thunk';

const initialState = {
  authentication: {
    isLoggedIn: false
  }
}

const createStore = () => reduxCreateStore(appReducers, initialState, applyMiddleware(thunk))

export default createStore;