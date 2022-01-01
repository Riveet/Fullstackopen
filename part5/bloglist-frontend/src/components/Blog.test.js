import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'The Big and the Small',
  author: 'Tim Urban',
  url: 'https://waitbutwhy.com/',
  likes: 401,
  user: {
    id: '61c816652f480a4cac4944c7',
    name: 'user',
    username: 'user',
  },
}

test('renders title and author by default', () => {
  const deleteBlog = () => {}
  const handleUpdate = () => {}
  const user = {}

  const component = render(
    <Blog
      blog={blog}
      deleteBlog={deleteBlog}
      handleUpdate={handleUpdate}
      user={user}
    />
  )

  const div = component.container.querySelector('.blog-style')
  expect(div).toHaveTextContent('The Big and the Small Tim Urban')
  expect(div).not.toHaveTextContent('https://waitbutwhy.com/')
  expect(div).not.toHaveTextContent('likes 401')
})

test('Clicking view button will display url and likes', () => {
  const deleteBlog = jest.fn()
  const handleUpdate = () => jest.fn()
  const user = {}

  const component = render(
    <Blog
      blog={blog}
      deleteBlog={deleteBlog}
      handleUpdate={handleUpdate}
      user={user}
    />
  )

  const div = component.container.querySelector('.blog-style')

  const button = component.getByText('view')
  fireEvent.click(button)

  console.log(prettyDOM(div))

  expect(div).toHaveTextContent('https://waitbutwhy.com/')
  expect(div).toHaveTextContent('likes 401')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const deleteBlog = jest.fn()
  const handleUpdate = () => jest.fn()
  const user = {}
  const component = render(
    <Blog
      blog={blog}
      deleteBlog={deleteBlog}
      handleUpdate={handleUpdate}
      user={user}
    />
  )

  // const div = component.container.querySelector('.blog-style')

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const p = component.container.querySelector('.likes')

  const button = component.container.querySelector('.like-btn')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(p).toHaveTextContent('likes 403')
})
