const notificationReducer = (state = '', action) => {
  if (action.type === 'SHOW_NOTIFICATION') {
    return action.notification
  }
  if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

let id = 0

export const setNotification = (notification, time) => {
  const timeInMs = time * 1000
  clearTimeout(id)
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
    })
    id = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeInMs)
  }
}

export default notificationReducer
