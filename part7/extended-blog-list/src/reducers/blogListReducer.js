import blogService from '../services/blogs'

const blogListReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGLIST':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    case 'UPDATE_BLOG': {
      const newList = state.map((blog) => {
        if (action.data.id === blog.id) {
          return action.data
        }
        return blog
      })
      return newList
    }
    default:
      return state
  }
}

export const initBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGLIST',
      data: blogs,
    })
  }
}

export const newBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const updateBlog = (id) => {
  return async (dispatch) => {
    const data = await blogService.update(id)
    dispatch({
      type: 'UPDATE_BLOG',
      data,
    })
  }
}

export default blogListReducer
