import { useEffect } from 'react'
import AnectodeForm from './components/AnectodeForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  let notification = useSelector((state) => state.showNotification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

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

export default App
