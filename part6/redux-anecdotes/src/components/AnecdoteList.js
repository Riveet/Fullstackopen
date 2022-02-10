import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filterArr, vote, setNotification }) => {
  const votedAnecdote = (id, anecdote) => {
    vote({ id, content: anecdote })
    setNotification(`you voted '${anecdote.content}'`, 3)
  }

  const list = filterArr ? filterArr : anecdotes

  return (
    <div>
      {list.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votedAnecdote(anecdote.id, anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filterArr: state.filter,
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
