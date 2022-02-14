import comments from '../services/comments'

const commentsReducer = (state = '', action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'CREATE_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const initComments = (blogId) => {
  return async (dispatch) => {
    const data = await comments.getAll(blogId)
    dispatch({
      type: 'INIT_COMMENTS',
      data,
    })
  }
}

export const createComment = (blogId, content) => {
  return async (dispatch) => {
    console.log(blogId, content)
    const data = await comments.createNew(blogId, content)
    dispatch({
      type: 'CREATE_COMMENT',
      data,
    })
  }
}

export default commentsReducer
