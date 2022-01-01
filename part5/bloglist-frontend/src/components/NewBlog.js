import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ handleNewBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handleNewBlog({
      title,
      author,
      url,
      userId: user.userId,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className='form'>
      <div>
        title
        <input
          type='text'
          id='title'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          id='author'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          id='url'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default NewBlog

NewBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
