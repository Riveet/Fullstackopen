import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

test('to check if the form calls the event handler it received as props with the right details when a new blog is created.', () => {
  const handleNewBlog = jest.fn()
  const user = {}

  const component = render(
    <NewBlog handleNewBlog={handleNewBlog} user={user} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.form')

  fireEvent.change(title, {
    target: { value: 'The Big and the Small' },
  })
  fireEvent.change(author, {
    target: { value: 'Tim Urban' },
  })
  fireEvent.change(url, {
    target: { value: 'https://waitbutwhy.com/' },
  })
  fireEvent.submit(form)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0]).toEqual({
    title: 'The Big and the Small',
    author: 'Tim Urban',
    url: 'https://waitbutwhy.com/',
    userId: undefined,
  })
})
