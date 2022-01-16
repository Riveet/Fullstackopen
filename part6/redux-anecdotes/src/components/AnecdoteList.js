import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  clearNotification,
} from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterArr = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const votedAnecdote = (id, anecdote) => {
    dispatch(vote(id))
    dispatch(showNotification(`You voted ${anecdote}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const list = filterArr ? filterArr : anecdotes

  return (
    <div>
      {list.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => votedAnecdote(anecdote.id, anecdote.content)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
