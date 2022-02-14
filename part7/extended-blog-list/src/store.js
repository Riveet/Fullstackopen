import { createStore, applyMiddleware, combineReducers } from 'redux'
import blogListReducer from './reducers/blogListReducer'
import userReducer from './reducers/userReducer'
import fetchUsersReducer from './reducers/fetchUsersReducer'
import commentsReducer from './reducers/commentsReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogListReducer,
  userReducer,
  fetchUsersReducer,
  commentsReducer,
  notificationReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
  console.log(store.getState())
})

export default store
