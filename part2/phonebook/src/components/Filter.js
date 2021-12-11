import React from 'react'

const Filter = ({ findPerson, search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <form onSubmit={findPerson}>
      <label>filter shown with</label>
      <input value={search} name='search' onChange={handleChange} />
    </form>
  )
}

export default Filter
