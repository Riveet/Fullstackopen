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
export default notificationReducer
