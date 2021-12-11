import React from 'react'

const PersonForm = ({
  addNote,
  newName,
  number,
  setNewName,
  setNumber,
  persons,
}) => {
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setNewName(e.target.value)
    }
    if (e.target.name === 'number') {
      setNumber(e.target.value)
    }
  }
  return (
    <form onSubmit={addNote}>
      <h2>Add new:</h2>
      <div>
        name: <input value={newName} name='name' onChange={handleChange} />
      </div>
      <div>
        number: <input value={number} name='number' onChange={handleChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
