import { put, call } from 'redux-saga/effects'
import { path } from 'ramda'
import * as R from 'ramda';

import PomodoroActions from '../redux/PomodoroRedux'

// This function gets executed everytime there is an action called to fetch tasks
export function * fetchSettings(api, {}){
    const response = yield call(api.getPomodoroSettings)
    const settings = path(['data'], response)
    // always take the first one
    // set the settings
    yield put(PomodoroActions.setSettings(settings[0]))
    
}