import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', msg: '' })
  const [formVisible, setFormVisible] = useState(false)
  const [updatePost, setUpdatePost] = useState(null)

  const fetchData = async () => {
    try {
      const data = await blogService.getAll()
      const sortedData = data.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [updatePost])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUpdate = async (updatedObj) => {
    const response = await blogService.update(updatedObj)
    setUpdatePost(response)
  }

  const deleteBlog = async (blog) => {
    const { id } = blog
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author} ?`
    )
    if (confirmDelete) {
      blogService.setToken(user.token)
      const updatedBlogList = blogs.filter((blog) => blog.id !== id)
      await blogService.deleteBlog(blog)
      setBlogs(updatedBlogList)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (error) {
      setNotification({ type: 'danger', msg: 'Invalid credentials' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNewBlog = async (blogObj) => {
    try {
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        type: 'success',
        msg: `A new blog ${blogObj.title} added to the list`,
      })
    } catch (error) {
      setNotification({ type: 'danger', msg: 'Failed to create new blog' })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  // const id = blogs ? blogs.user.id : null

  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  const blog = () => {
    return blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        handleUpdate={handleUpdate}
        deleteBlog={deleteBlog}
      />
    ))
  }

  const loginForm = () => {
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {notification ? (
        <p className={`${notification.type}`}>{notification.msg}</p>
      ) : null}
      {!user ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout</button>
          <div>
            <button
              onClick={() => setFormVisible(true)}
              style={hideWhenVisible}
            >
              Create new blog
            </button>
            <div style={showWhenVisible}>
              <NewBlog handleNewBlog={handleNewBlog} user={user} />
              <button
                style={showWhenVisible}
                onClick={() => setFormVisible(false)}
              >
                cancel
              </button>
            </div>
          </div>
          {blog()}
        </div>
      )}
    </div>
  )
}

export default App
