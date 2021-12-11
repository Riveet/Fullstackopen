import React from 'react'

const Persons = ({ persons, search, searchVal, deletePerson }) => {
  return (
    <div>
      {!search && persons
        ? persons.map((person) => {
            return (
              <p key={person.id}>
                {/* {person.name.charAt(0).toUpperCase() + person.name.slice(1)}{' '} */}
                {person.name} {person.number}{' '}
                <button onClick={() => deletePerson(person.id)}>delete</button>
              </p>
            )
          })
        : searchVal.map((person) => {
            return (
              <p key={person.id}>
                {/* {person.name.charAt(0).toUpperCase() + person.name.slice(1)}{' '} */}
                {person.name} {person.number}{' '}
                <button onClick={() => deletePerson(person.id)}>delete</button>
              </p>
            )
          })}
    </div>
  )
}

export default Persons
