import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  initBlogList,
  newBlog,
  updateBlog,
} from './reducers/blogListReducer'
import { loginUser, logout, getUser } from './reducers/userReducer'
import {
  clearNotification,
  showNotification,
} from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogList())
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(getUser(user))
  }, [])

  const notifyWith = (message, type = 'success') => {
    console.log(message, type)
    dispatch(showNotification({ msg: message, type }))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const blogList = useSelector((state) => state.blogListReducer)
  const blogUser = useSelector((state) => state.userReducer)
  const notification = useSelector((state) => state.notificationReducer)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username,
        password,
      }
      dispatch(loginUser(credentials))
      setUsername('')
      setPassword('')
      notifyWith(`${blogUser.name} welcome back!`)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogList.find((b) => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogList.find((b) => b.id === id)
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    )
    if (ok) {
      dispatch(deleteBlog(id))
    }
  }

  if (!blogUser) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <BrowserRouter>
      <div>
        <h2>blogs</h2>
        <div>
          <Link to='/'>Blogs</Link> {'  '} <Link to='/users'>Users</Link>
        </div>
      </div>

      <Notification notification={notification} />

      <p>
        {blogUser.name} logged in{' '}
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>

              {blogList.sort(byLikes).map((blog) => {
                return (
                  <Link
                    to={`/blogs/${blog.id}`}
                    key={blog.id}
                    style={blogStyle}
                  >
                    {blog.title}
                  </Link>
                )
              })}
            </>
          }
        ></Route>

        <Route element={<Users />} path='/users' />
        <Route element={<User />} path='/users/:id' />
        <Route
          element={blogList.map((blog) => {
            return (
              <Blog
                blogList={blogList}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={blogUser.username === blog.user.username}
              />
            )
          })}
          path='/blogs/:id'
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
