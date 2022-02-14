import getUsers from '../services/users'

const fetchUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const data = await getUsers()
    dispatch({
      type: 'INIT_USERS',
      data,
    })
  }
}

export default fetchUsersReducer
