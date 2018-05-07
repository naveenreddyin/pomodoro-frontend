import { takeEvery } from 'redux-saga/effects'
import API from '../services/Api'

import { TaskTypes } from '../redux/TaskRedux'
import { PomodoroTypes } from '../redux/PomodoroRedux'

import { fetchTasks, createTask, deleteTask, updateTask, 
    updateTaskDone, updateTaskStarted, updateTaskPomodoroCount} from './TaskSagas'
import { fetchSettings } from './PomodoroSagas'


const api = API.create()

export default function * root () {
    yield [
        takeEvery(TaskTypes.FETCH_TASKS, fetchTasks, api),
        takeEvery(TaskTypes.CREATE_TASK, createTask, api),
        takeEvery(TaskTypes.DELETE_TASK, deleteTask, api),
        takeEvery(TaskTypes.UPDATE_TASK, updateTask, api),
        takeEvery(TaskTypes.UPDATE_TASK_STARTED, updateTaskStarted, api),
        takeEvery(TaskTypes.UPDATE_TASK_DONE, updateTaskDone, api),
        takeEvery(TaskTypes.UPDATE_TASK_POMODORO_COUNT, updateTaskPomodoroCount, api),
        takeEvery(PomodoroTypes.FETCH_SETTINGS, fetchSettings, api),
    ]
}
