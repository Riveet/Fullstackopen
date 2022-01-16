const filterReducer = (state = null, action) => {
  if (action.type === 'FILTER') {
    const filterArr = action.data.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(action.data.value.toLowerCase())
    )
    return filterArr
  }
  return state
}

export const filter = ({ value, anecdotes }) => {
  return {
    type: 'FILTER',
    data: {
      value,
      anecdotes,
    },
  }
}

export default filterReducer
