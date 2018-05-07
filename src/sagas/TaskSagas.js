import { put, call } from 'redux-saga/effects'
import { path } from 'ramda'
import * as R from 'ramda';

import TaskActions from '../redux/TaskRedux'

// This function gets executed everytime there is an action called to fetch tasks
export function * fetchTasks(api, {}){
    const response = yield call(api.getTasks)
    const tasks = path(['data'], response)
    
    // filter tasks based on started and done attribute
    let isDone = i => i.done
    let doneTasks = R.filter(isDone, tasks)
    let isStarted = i => i.started
    let progressTasks = R.filter(isStarted, tasks)
    let isNotStartedOrDone = i => i.started === false && i.done === false;
    let iTasks = R.filter(isNotStartedOrDone, tasks)
    // set the tasks
    yield put(TaskActions.setTasks(iTasks))
    yield put(TaskActions.setDoneTasks(doneTasks))
    yield put(TaskActions.setProgressTasks(progressTasks))
}

// This function takes an input of title name and call the api to create task
export function * createTask(api, {title}){
    const response = yield call(api.createTask, title)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}

// This function is used to delete the task
export function * deleteTask(api, {taskId}){
    const response = yield call(api.deleteTask, taskId)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}

// This function is used to update the task
export function * updateTask(api, {taskId, title}){
    const response = yield call(api.updateTask, taskId, title)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}

// This function is used to update the task started attribute
export function * updateTaskStarted(api, {taskId, started}){
    const response = yield call(api.updateTaskStarted, taskId, started)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}

// This function is used to update the task done attribute
export function * updateTaskDone(api, {taskId, done}){
    const response = yield call(api.updateTaskDone, taskId, done)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}

// this function will update pomodoro count once timer is finished for a task
export function * updateTaskPomodoroCount(api, {taskId, count}){
    const response = yield call(api.updateTaskPomodoroCount, taskId, count)
    console.log(response)
    // fetch tasks again
    yield put(TaskActions.fetchTasks())
}
