import { useState } from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = ({ filter, anecdotes }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
    setTimeout(() => {
      filter({ value, anecdotes })
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

export default connect(mapStateToProps, { filter })(Filter)
