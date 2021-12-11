import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import services from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [searchVal, setSearchVal] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [notification, setNotification] = useState({ type: '', msg: '' })

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await services.getAll()
      console.log(data)
      setPersons(data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addNote = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number,
      }

      services
        .create(newPerson)
        .then((data) => setPersons(persons.concat(data)))
        .catch((err) => console.log(err))
      setNewName('')
      setNumber('')
      setNotification({ type: 'success', msg: `Added ${newName}` })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } else {
      const updateNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (updateNumber) {
        const changedNumber = { ...existingPerson, number }
        services
          .update(existingPerson.id, changedNumber)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : data
              )
            )
          })
          .catch((err) =>
            setNotification({
              type: 'danger',
              msg: `Information of ${newName} has already been removed from server`,
            })
          )
      }

      setNewName('')
      setNumber('')
      // setNotification({ type: 'success', msg: `${newName} number edited` })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const findPerson = (e) => {
    e.preventDefault()
    const searchPerson = persons.filter((person) => {
      const personName = person.name.toLowerCase()
      if (personName.startsWith(search.toLowerCase())) {
        return person
      }
    })
    setSearchVal(searchPerson)
  }

  const deletePerson = async (id) => {
    await services.deleteObj(id)
    const data = persons.filter((person) => person.id !== id)
    const person = persons.find((p) => p.id === id)
    setPersons(data)
    setNotification({
      type: 'danger',
      msg: `Information of ${person.name} deleted`,
    })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification ? (
        <p className={`${notification.type}`}>{notification.msg}</p>
      ) : null}
      <Filter findPerson={findPerson} search={search} setSearch={setSearch} />

      <PersonForm
        addNote={addNote}
        newName={newName}
        number={number}
        setNewName={setNewName}
        setNumber={setNumber}
        persons={persons}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        search={search}
        searchVal={searchVal}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
