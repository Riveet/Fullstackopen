const Books = (props) => {
  const { books, bookQueryLoading, bookQueryError } = props
  if (!props.show) {
    return null
  }

  console.log(books)

  // const booksArr = [...books]

  if (bookQueryLoading) {
    return <h1>Loading...</h1>
  }

  if (bookQueryError) {
    return <h1>Something went wrong!</h1>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
