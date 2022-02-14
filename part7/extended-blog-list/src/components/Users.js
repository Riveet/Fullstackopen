import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initUsers } from '../reducers/fetchUsersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  const users = useSelector((state) => state.fetchUsersReducer)

  if (!users) {
    return null
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const { blogs, id, name } = user
          return (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Users
