import React from 'react'
import axios from 'axios'
import personService from '../services/persons'
import { v4 as uuid } from 'uuid';

const PersonForm = (props) => {
    console.log("PersonForm props", props)
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
    const addName = (event) => {
        event.preventDefault()
        
        const names = props.persons.map(person => person.name)
        const nameObject = {name: props.newName, number: props.newNumber, id: small_id}
        //console.log("new id", small_id)

        if (names.includes(props.newName)) {
            if (window.confirm(props.newName + " is already added to phonebook, replace the old number with the new one?")){
                
                
                const editedPerson = props.persons.find(n => n.name === props.newName)
                const changedNumber = { ...editedPerson, number: props.newNumber }
                console.log("changed number", changedNumber)
                personService
                .update(editedPerson.id, changedNumber)
                .then(response => {
                    props.setPersons(props.persons.map(person => person.id !== editedPerson.id ? person : response))
                    
                    props.setNewName('')
                    props.setNewNumber('')
                })
                //console.log("props.persons setelah edit", props.persons)
            }
            else{}
        } 
        else {
            personService
            .create(nameObject)
            .then(returnedPerson => {
                props.setPersons(props.persons.concat(returnedPerson))
                props.setNewName('')
                props.setNewNumber('')
            })
            .then(info => {props.setInfoMessage("Data has been succesfully saved")
                setTimeout(() => {
                props.setInfoMessage(null)
              }, 5000)
            }


            )
            //console.log("props.persons setelah add", props.persons)
        }
    }

    const handleNameChange = (event) => {
    //console.log(event.target.value)
    props.setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
    //console.log(event.target.value)
    props.setNewNumber(event.target.value)
    }

    return(
        <form onSubmit={addName}>
            <div>
            name: <input value={props.newName} onChange={handleNameChange}/>
            </div>
            <div>
            number: <input value={props.newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm
