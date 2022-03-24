import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }
  const authors = [...props.author?.allAuthors]
  console.log(authors)

  const handleSubmit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { name, born: dob } })

    setDob('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <select
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '0.3rem' }}
          >
            {authors.map((a) => {
              return (
                <option value={a.name} key={a.id}>
                  {a.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label>Born</label>
          <input
            type='number'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ marginTop: '0.5rem', marginLeft: '0.3rem' }}
          />
        </div>
        <button type='submit' style={{ marginTop: '0.5rem' }}>
          Edit
        </button>
      </form>
    </div>
  )
}

export default Authors
