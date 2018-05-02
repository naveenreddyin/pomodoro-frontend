import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import { createLogger } from 'redux-logger'
import Config from '../config/DebugSettings'
import createSagaMiddleware from 'redux-saga'
import * as R from 'ramda';
import { routerMiddleware } from 'react-router-redux'



// creates the store
export default (rootReducer, rootSaga) => {
const middlewares = [];

//middlewares.push(logger);
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware);
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']

// the logger master switch
const USE_LOGGING = Config.reduxLogging
// silence these saga-based messages
// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
})
middlewares.push(logger)

// mount it on the Store
//const store = createStore(
//  rootReducer,
//  applyMiddleware(sagaMiddleware)
//)
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
