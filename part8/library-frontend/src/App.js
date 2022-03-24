import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const { loading, error, data: author } = useQuery(ALL_AUTHORS)
  const {
    loading: bookQueryLoading,
    error: bookQueryError,
    data,
  } = useQuery(ALL_BOOKS)

  const [page, setPage] = useState('author')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        author={author}
        loading={loading}
        error={error}
      />

      <Books
        show={page === 'books'}
        bookQueryLoading={bookQueryLoading}
        bookQueryError={bookQueryError}
        books={data?.allBooks}
      />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
