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

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
    
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  function personIdFromName(personId){
    return persons.find((person) => newName === person.name).id;
  }

  const addName = (event) => {
    event.preventDefault()
    let checkExists = persons.some((person) => newName === person.name);
      const newPerson = {
        name: newName,
        number: newNumber
      }
    if(checkExists){
      if(window.confirm(`Person is already added to phonebook, replace phonenumber?`)){
        personService
        .update(personIdFromName(newName), newPerson)
        .then(response => {
        
        personService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setFilteredPersons(response.data)
              setSuccessMessage(
                `Updated '${newName}'`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
        })
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      }).catch(error => {
        setErrorMessage(
          `Information of '${newName}' has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

      }
    }else{


    personService
    .create(newPerson)
    .then(response => {
        setFilteredPersons(persons.concat(response.data))
        setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
      setSuccessMessage(
        `Added '${newName}'`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
        <ErrorNotification message={errorMessage} />
        <SuccessNotification message={successMessage} />
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