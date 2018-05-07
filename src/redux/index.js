// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    task: require('./TaskRedux').reducer,
    pomodoro: require('./PomodoroRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}