import { useEffect } from 'react'
import AnectodeForm from './components/AnectodeForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = ({ notification, initAnecdotes }) => {
  useEffect(() => {
    initAnecdotes()
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification notification={notification} />}
      <Filter />
      <AnecdoteList />
      <AnectodeForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.showNotification,
  }
}

export default connect(mapStateToProps, { initAnecdotes })(App)
