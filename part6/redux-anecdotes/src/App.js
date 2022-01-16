import AnectodeForm from './components/AnectodeForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import Filter from './components/Filter'

const App = () => {
  let notification = useSelector((state) => state.showNotification)
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
