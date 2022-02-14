import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      storage.saveUser(action.data)
      return action.data
    case 'LOGOUT_USER':
      storage.logoutUser()
      return null
    case 'GET_USER':
      storage.loadUser(action.data)
      return action.data
    default:
      return state
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const data = await loginService.login(credentials)
    dispatch({
      type: 'LOGIN',
      data,
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

export const getUser = (data) => {
  return {
    type: 'GET_USER',
    data,
  }
}

export default userReducer
