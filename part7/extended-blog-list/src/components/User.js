import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector((state) => state.fetchUsersReducer)

  const { id } = useParams()
  const user = users.find((arr) => arr.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h5>Added blogs:</h5>
      <ul>
        {user.blogs.map((blog) => {
          const { id, title } = blog
          return <li key={id}>{title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
