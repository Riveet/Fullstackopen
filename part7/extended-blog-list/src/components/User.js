import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const User = () => {
  const users = useSelector((state) => state.fetchUsersReducer)

  const { id } = useParams()
  const user = users.find((arr) => arr.id === id)

  if (!user) {
    return null
  }

  return (
    <Wrapper>
      <h3>{user.name}</h3>
      <h5>Added blogs:</h5>
      <ul>
        {user.blogs.map((blog) => {
          const { id, title } = blog
          return <li key={id}>{title}</li>
        })}
      </ul>
    </Wrapper>
  )
}

export default User

const Wrapper = styled.div`
  margin-left: 20px;

  h3 {
    margin-bottom: 10px;
  }

  h5 {
    margin-bottom: 5px;
  }
`
