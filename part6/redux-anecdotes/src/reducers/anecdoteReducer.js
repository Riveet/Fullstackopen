import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === 'CREATE_ANECDOTE') {
    const anecdote = action.data
    return [...state, anecdote]
  }

  if (action.type === 'VOTE') {
    console.log(action.data)
    const { id } = action.data
    const newList = state.map((anecdote) => {
      if (anecdote.id === id) {
        return action.data
      }
      return anecdote
    })
    return newList
  }

  if (action.type === 'SORT') {
    const newList = action.data.sort((a, b) => {
      return b.votes - a.votes
    })
    return newList
  }

  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return state
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = ({ id, content }) => {
  const updatedContent = { ...content, votes: content.votes + 1 }
  return async (dispatch) => {
    await anecdoteService.update({
      id,
      content: updatedContent,
    })
    dispatch({
      type: 'VOTE',
      data: updatedContent,
    })
  }
}

export const sortAnecdotes = (anecdotes) => {
  return {
    type: 'SORT',
    data: anecdotes,
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
