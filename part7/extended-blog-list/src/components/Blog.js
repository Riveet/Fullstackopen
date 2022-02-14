import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { createComment, initComments } from '../reducers/commentsReducer'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Blog = ({ blogList, handleLike, handleRemove, blogUser }) => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const own = blogUser.username === blog.user.username

  if (!blog || !comments) {
    return <p>Not Found...</p>
  }

  const deleteBlog = (id) => {
    handleRemove(id)
    navigate('/')
  }

  return (
    <Wrapper>
      <h3>
        <i>{blog.title}</i> by {blog.author}{' '}
      </h3>

      <div>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </p>
        <div>{blog.user.name}</div>
        {own && <button onClick={() => deleteBlog(blog.id)}>remove</button>}
      </div>
      <Link to='/' className='link'>
        Go back
      </Link>
      <div className='comments'>
        <h4>Comments</h4>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='form-input'
            placeholder='comment'
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
    </Wrapper>
  )
}

Blog.propTypes = {
  blogList: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  blogUser: PropTypes.object.isRequired,
}

export default Blog

const Wrapper = styled.div`
  margin: 5px 15px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }

  .comments {
    margin-top: 20px;
  }

  .link {
    cursor: pointer;
    margin-top: 5px;
    text-decoration: none;
    transition: ease-in-out 500ms;
    color: black;

    :hover {
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 992px) {
    margin: 5px auto;

    form {
      max-width: 660px;
      margin: 10px 0;
    }
  }
`
