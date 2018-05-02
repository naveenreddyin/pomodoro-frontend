import { takeEvery } from 'redux-saga/effects'
import API from '../services/Api'

import { UserTypes } from '../redux/UserRedux'

import { login, register } from './UserSagas'

const api = API.create()

export default function * root () {
    console.log("coming inside root saga")
    yield [
        takeEvery(UserTypes.LOGIN, login, api),
        takeEvery(UserTypes.REGISTER, register, api),
    ]
}
