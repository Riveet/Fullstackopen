const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const showNotification = ({ msg, type }) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { msg, type },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
