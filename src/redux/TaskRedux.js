import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchTasks: [],
  setTasks: ['tasks'],
  setProgressTasks: ['progressTasks'],
  createTask: ['title'],
  deleteTask: ['taskId'],
  updateTask: ['taskId', 'title'],
  updateTaskStarted: ['taskId', 'started'],
  updateTaskDone: ['taskId', 'done'],
  setDoneTasks: ['doneTasks'],
  editTask: ['currentTask', 'openEditModal'],
  updateTaskPomodoroCount: ['taskId', 'count']
})

export const TaskTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  tasks: null,
  title: null,
  taskId: null,
  doneTasks: [],
  progressTasks: [],
  started: null,
  done: null,
  currentTask: null,
  openEditModal: false,
  count: 0,
})

/* ------------- Reducers ------------- */


export const fetchTasks = (state: Object, {}: Object) => {
    return state.merge({fetching: true})
}

export const setTasks = (state: Object, { tasks }: Object) => {
    return state.merge({fetching: false, tasks: tasks })
}

export const createTask = (state: Object, { title }: Object) => {
  return state.merge({fetching: true })
}

export const deleteTask = (state: Object, { taskId }: Object) => {
  return state.merge({fetching: true })
}

export const updateTask = (state: Object, { taskId, title }: Object) => {
  return state.merge({fetching: true,  openEditModal: false})
}

export const updateTaskStarted = (state: Object, { taskId, started }: Object) => {
  return state.merge({fetching: true })
}

export const updateTaskDone = (state: Object, { taskId, done }: Object) => {
  return state.merge({fetching: true })
}

export const setProgressTasks = (state: Object, { progressTasks }: Object) => {
  return state.merge({fetching: false, progressTasks: progressTasks })
}

export const setDoneTasks = (state: Object, { doneTasks }: Object) => {
  return state.merge({fetching: false, doneTasks: doneTasks })
}

export const editTask = (state: Object, { currentTask, openEditModal }: Object) => {
  return state.merge({openEditModal: openEditModal, currentTask: currentTask })
}

export const updateTaskPomodoroCount = (state: Object, { taskId, count }: Object) => {
  return state.merge({})
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_TASKS]: fetchTasks,
  [Types.SET_TASKS]: setTasks,
  [Types.CREATE_TASK]: createTask,
  [Types.DELETE_TASK]: deleteTask,
  [Types.UPDATE_TASK]: updateTask,
  [Types.UPDATE_TASK_STARTED]: updateTaskStarted,
  [Types.UPDATE_TASK_DONE]: updateTaskDone,
  [Types.SET_PROGRESS_TASKS]: setProgressTasks,
  [Types.SET_DONE_TASKS]: setDoneTasks,
  [Types.EDIT_TASK]: editTask,
  [Types.UPDATE_TASK_POMODORO_COUNT]: updateTaskPomodoroCount,
})

