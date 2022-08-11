import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [searchText, setSearchText] = useState(''); 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [infoMessage, setInfoMessage] = useState()

  let filter = ""
  
  if (searchText !== "" ){
      filter = searchText.toLowerCase()
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const toggleDeleteOf = (id, name) => {
    alert("Delete " + name + "?")

    personService
      .delete(id)
      .then(response => {
          setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `Information of '${name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter persons={persons} setPersons={setPersons} setSearchText={setSearchText}/>
        <Notification status='error' message={errorMessage} />
        <Notification status ='info' message={infoMessage} />
      <h3>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} infoMessage={infoMessage} setInfoMessage={setInfoMessage}/>
      <h3>Numbers</h3>
      
      <ul>
      {persons.filter(person=>(person.name).toLowerCase().includes(filter)).map(person => 
          <Persons
            key={person.id}
            person = {person}
            toggleDelete={() => toggleDeleteOf(person.id, person.name)}
          />
        )}
      </ul>
        
    </div>
  )
}



export default App