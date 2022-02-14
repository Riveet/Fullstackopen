import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { createComment, initComments } from '../reducers/commentsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blogList, handleLike, handleRemove, own }) => {
  const [value, setValue] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(initComments(id))
  }, [])

  const blog = blogList.find((arr) => arr.id === id)

  const comments = useSelector((state) => state.commentsReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    const comment = { content: value }
    dispatch(createComment(id, comment))
  }

  if (!blog || !comments) {
    return <p>Not Found...</p>
  }

  return (
    <div style={blogStyle} className='blog'>
      <h3>
        <i>{blog.title}</i> by {blog.author}{' '}
      </h3>

      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      <Link to='/'>Go back</Link>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button>Add Comment</button>
        </form>
        <ul>
          {comments.map((comment) => {
            const { content, id } = comment
            return <li key={id}>{content}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blogList: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired,
}

export default Blog
