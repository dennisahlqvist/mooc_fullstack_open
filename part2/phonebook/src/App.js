import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Persons = ({persons, deletePerson}) => {
  return (
    <div>
        {persons.map(person => 
      <Person key={person.id} person={person} deletePerson={deletePerson} />
    )}
  </div>
  )
}

const Person = ({person, deletePerson}) => {
  return (
      <p key={person.id}> {person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button></p>
  )
}

const Button = (props) => {
  return (
      <div><button type={props.type}>{props.text}</button></div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
    
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addName = (event) => {
    event.preventDefault()
    let checkExists = persons.some((person) => newName === person.name);
    if(checkExists){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }

    personService
    .create(newPerson)
    .then(response => {
      console.log(response)
        setFilteredPersons(persons.concat(response.data))
        setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
      })
    }
  }

  const deletePerson = (personId) => {
    if(window.confirm(`Confirm Delete?`)){


      personService
        .remove(personId)
        .then(response => {
          setNewFilter('')
          personService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setFilteredPersons(response.data)
          })
        })
    }

  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    const filtered = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>filter shown with: <input value={newFilter} onChange={handleFilterChange}/></div>
        <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <Button type="submit" text="add" />
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App