import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const { authorLoading, authorError, data: author } = useQuery(ALL_AUTHORS)
  const {
    loading: bookQueryLoading,
    error: bookQueryError,
    data,
  } = useQuery(ALL_BOOKS)

  const [page, setPage] = useState('author')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Login
          show={page === 'login'}
          setToken={setToken}
          setError={setError}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors
        show={page === 'authors'}
        author={author}
        loading={authorLoading}
        error={authorError}
      />

      <Books
        show={page === 'books'}
        bookQueryLoading={bookQueryLoading}
        bookQueryError={bookQueryError}
        books={data?.allBooks}
      />

      <NewBook show={page === 'add'} />

      <button onClick={logout}>logout</button>
    </div>
  )
}

export default App
