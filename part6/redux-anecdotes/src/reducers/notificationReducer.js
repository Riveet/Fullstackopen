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

export const setNotification = (notification, time) => {
  const timeInMs = time * 1000
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeInMs)
  }
}

export default notificationReducer
