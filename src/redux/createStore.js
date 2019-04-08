import { createStore as reduxCreateStore } from 'redux'
import { applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const initialState = {
  authentication: {
    isLoggedIn: false,
  },
}

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : middleware => middleware

const createStore = () =>
  reduxCreateStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

export default createStore
