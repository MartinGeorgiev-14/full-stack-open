import { useState, useEffect } from 'react'
import Heading from './components/Heading'
import Input from './components/Input'
import Content from './components/Content'
import Button from './components/Button'
import Message from './components/Message'
import phoneServices from './services/people'
import "./index.css"

function App() {
  const [person, setPerson] = useState([])
  const [newPerson, setNewPerson] = useState({})
  const [filtered, setFiltered] = useState('')
  const [actionMessage, setActionMessage] = useState()
 
  //Initial display of all people
  useEffect(() => {
    phoneServices
    .getAll()
    .then(response => {
      setPerson(response)
    })
  } ,[])
  
  const handleName = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumber = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleNewName = (event) => {
    event.preventDefault()
  
    if (person.find(p => p.name === newPerson.name)) {
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const foundPerson = person.find(p => p.name === newPerson.name)
        setNewPerson({...newPerson, id:foundPerson.id})
        
        phoneServices
        .update(foundPerson.id, newPerson)
        .then(response => setPerson(person.map(p => 
          { 
            if(p.id !== foundPerson.id){
              return p
              }
              else{
                displayMessage(response.name, "'s phone has been updated", "normal")
                return response
              }   
          })))
        return 
      }
    }
    else{
      phoneServices
      .create(newPerson)
      .then(response => {
        setPerson(person.concat(response))
        displayMessage(response.name, "has been added", "normal")
      })
    }

  }

  const handleSearch = (event) => {
    const filtered = person.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()));

    setFiltered(filtered)
  }

  function handleDelete(id) {
    
    function confirm() {
      const founded = person.find(p => p.id === id)

      if(founded){
        if(window.confirm(`Delete ${founded.name} ?`)){
          phoneServices.remove(id)
          .then(response => {
            setPerson(person.filter(p => p.id !== id))
            displayMessage(founded.name, "has been deleted", "normal")
          }).catch(error => {
            displayMessage(founded.name, "does not extis", "error")
          })
        }
      }    
    }
    
    return confirm
  }

  const displayMessage = (person, msg, type) => {
    setActionMessage({
      txt: `${person} ${msg}`,
      type: type
    })

    setTimeout(() => {
      setActionMessage(null)
    }, 5000);
  }


  return (
    <div>
      <Heading text="Phonebook"/>
      {actionMessage ? <Message message={actionMessage.txt} class={actionMessage.type}/> : ""}
      <form >
        <Input text="filter shown with" handleFnc={handleSearch}/>
      </form>

      <Heading text="add a new"/>
      <form onSubmit={handleNewName}>
        <Input text="name:" handleFnc={handleName}/>
        <Input text="number:" handleFnc={handleNumber}/>
        <Button text="add" type="submit"/>
      </form>

      <Heading text="Numbers"/>
      <Content person={person} filtered={filtered} fnc={handleDelete}/>
    </div>
  )
}

export default App
