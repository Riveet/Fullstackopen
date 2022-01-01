/* eslint-disable indent */
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleUpdate, deleteBlog }) => {
  const [blogInfo, setBlogInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const likeBlog = async () => {
    setLikes(likes + 1)
    const updatedObj = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes,
      userId: user.userId,
    }

    await handleUpdate(updatedObj)
  }

  return (
    <div className='blog-style'>
      <p>
        {blog.title} {blog.author}{' '}
      </p>
      <button onClick={() => setBlogInfo(!blogInfo)}>
        {blogInfo ? 'hide' : 'view'}
      </button>
      {blogInfo ? (
        <div>
          <p>{blog.url}</p>
          <p className='likes'>
            likes {likes}{' '}
            <button className='like-btn' onClick={likeBlog}>
              Like
            </button>
          </p>
          <p>{blog.user ? blog.user.name : null}</p>
          {blog.user
            ? blog.user.id === user.userId && (
                <button onClick={() => deleteBlog(blog)} className='btn'>
                  Remove
                </button>
              )
            : null}
        </div>
      ) : null}
    </div>
  )
}
