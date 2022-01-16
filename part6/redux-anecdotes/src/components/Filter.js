import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
    setTimeout(() => {
      dispatch(filter({ value, anecdotes }))
    }, 500)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={value} onChange={handleChange} />
    </div>
  )
}

export default Filter
