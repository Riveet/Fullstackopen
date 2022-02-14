import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initUsers } from '../reducers/fetchUsersReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    <Wrapper>
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
                <Link to={`/users/${id}`} className='link'>
                  {name}
                </Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </Wrapper>
  )
}

export default Users

const Wrapper = styled.table`
  margin-left: 10px;
  .link {
    text-decoration: none;
    transition: ease-in-out 500ms;
    margin-right: 10px;
    color: black;

    :hover {
      text-decoration: underline;
    }
  }
`
