import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import showNotification from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  showNotification: showNotification,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

store.subscribe(() => {
  const { anecdotes } = store.getState()
  anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
})

export default store
