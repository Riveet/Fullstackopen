import React, { useState } from 'react'
import styled from 'styled-components'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Wrapper>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog} className='form'>
        <div className='form-row'>
          <input
            className='form-input'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div className='form-row'>
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className='form-input'
            placeholder='title'
          />
        </div>
        <div className='form-row'>
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className='form-input'
            placeholder='url'
          />
        </div>
        <button id='create'>create</button>
      </form>
    </Wrapper>
  )
}

export default NewBlog

const Wrapper = styled.div`
  margin: 5px;

  button {
    margin: 0;
    margin-top: 5px;
  }
`
