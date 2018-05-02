import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  register: ['email', 'password'],
  login: ['email','password'],
  setLoginResponse: ['loginFlag', 'message'],
  setRegisterResponse: ['message'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  email: null,
  password: null,
  loginFlag: false,
  userId: null,
  message: null,
})

/* ------------- Reducers ------------- */


export const register = (state: Object, { email, password }: Object) => {
    return state.merge({fetching: true})
}

export const login = (state: Object, { email, password }: Object) => {
    return state.merge({fetching: true })
}

export const setLoginResponse = (state: Object, { loginFlag, message }: Object) => {
  return state.merge({fetching: false})
}

export const setRegisterResponse = (state: Object, { message }: Object) => {
  return state.merge({fetching: false, message: message })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: register,
  [Types.LOGIN]: login,
  [Types.SET_LOGIN_RESPONSE]: setLoginResponse,
  [Types.SET_REGISTER_RESPONSE]: setRegisterResponse,
})

