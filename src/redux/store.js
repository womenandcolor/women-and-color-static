// NPM
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHashHistory from 'history/createHashHistory'

// App
import reducers from '../redux/reducers'

export const history = createHashHistory()
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
    : compose

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
