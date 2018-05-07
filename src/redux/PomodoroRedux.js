import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchSettings: [],
  setSettings: ['settings'],
  showTimerModal: ['currentTask', 'openTimerModal'],
  closeTimerModal: ['currentTask', 'openTimerModal'],
  timerFinished: ['currentTask', 'openTimerModal'],
})

export const PomodoroTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  settings: null,
  openTimerModal: false,
  currentTask: null,
})

/* ------------- Reducers ------------- */


export const fetchSettings = (state: Object, {}: Object) => {
    return state.merge({fetching: true})
}

export const setSettings = (state: Object, { settings }: Object) => {
    return state.merge({fetching: false, settings: settings })
}

export const showTimerModal = (state: Object, { currentTask,  openTimerModal}: Object) => {
    return state.merge({fetching: false, currentTask: currentTask, openTimerModal:openTimerModal })
}

export const closeTimerModal = (state: Object, { currentTask,  openTimerModal }: Object) => {
    return state.merge({fetching: false, currentTask: currentTask, openTimerModal:openTimerModal })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_SETTINGS]: fetchSettings,
  [Types.SET_SETTINGS]: setSettings,
  [Types.SHOW_TIMER_MODAL]: showTimerModal,
  [Types.CLOSE_TIMER_MODAL]: closeTimerModal,
})

