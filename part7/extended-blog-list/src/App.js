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
import styled from 'styled-components'

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
    }, 2000)
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
      const newBlogIndex = blogList.length - 1
      notifyWith(
        `a new blog '${blogList[newBlogIndex].title}' by ${blogList[newBlogIndex].author} added!`
      )
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
      <Wrapper>
        <h2 className='login-header'>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin} className='form'>
          <div className='form-row'>
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className='form-input'
              placeholder='username'
            />
          </div>
          <div className='form-row'>
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className='form-input'
              placeholder='password'
            />
          </div>
          <button id='login'>login</button>
        </form>
      </Wrapper>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <BrowserRouter>
      <Wrapper>
        <div className='app-header'>
          <div className='nav'>
            <Link to='/' className='nav-links'>
              Blogs
            </Link>{' '}
            {'  '}{' '}
            <Link to='/users' className='nav-links'>
              Users
            </Link>
          </div>
          <h2 className='app-title'>Blogs</h2>
          <p className='login'>
            {blogUser.name} logged in{' '}
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
        </div>

        <Notification notification={notification} />

        <Routes>
          <Route
            path='/'
            element={
              <>
                <Togglable
                  buttonLabel='create new blog'
                  ref={blogFormRef}
                  className='create-btn'
                >
                  <NewBlog createBlog={createBlog} />
                </Togglable>

                <div className='blog-list'>
                  {blogList.sort(byLikes).map((blog) => {
                    return (
                      <Link
                        to={`/blogs/${blog.id}`}
                        key={blog.id}
                        className='blog'
                      >
                        {blog.title}
                      </Link>
                    )
                  })}
                </div>
              </>
            }
          ></Route>

          <Route element={<Users />} path='/users' />
          <Route element={<User />} path='/users/:id' />
          <Route
            element={
              <Blog
                blogList={blogList}
                handleLike={handleLike}
                handleRemove={handleRemove}
                blogUser={blogUser}
              />
            }
            path='/blogs/:id'
          />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  )
}

export default App

const Wrapper = styled.div`
  .login-header {
    text-transform: capitalize;
    text-align: center;
    margin: 10px auto;
  }
  .app-title {
    text-align: center;
  }

  button {
    cursor: pointer;
    color: black;
    background: #558564;
    border: transparent;
    border-radius: 0.25rem;
    letter-spacing: 1px;
    padding: 0.375rem 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    margin: 5px;
  }

  button:hover {
    opacity: 0.7;
  }

  .login {
    font-size: 0.9rem;

    button {
      font-size: 0.6rem;
      padding: 3px 5px;
      border: none;
      border-radius: 5px;
      margin: 0;
      margin-left: 2px;
    }
  }

  .nav-links {
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
    transition: ease-in-out 500ms;
  }

  .nav-links:hover {
    text-decoration: underline;
  }

  .app-header {
    margin-bottom: 50px;
    background-color: #abd1b5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 10px;
  }

  .blog {
    margin-top: 5px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    border: black 1px solid;
    border-radius: 5px;
    padding: 10px 15px;
    transition: ease-in-out 500ms;

    :hover {
      text-decoration: underline;
    }
  }

  .blog-list {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media screen and (min-width: 992px) {
    .blog-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
    }
  }
`
