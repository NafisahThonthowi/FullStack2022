import React from 'react'

const Persons = ({person, toggleDelete}) => {

    //console.log("Persons props", person)

    return(       
          <li className='person'>
            {person.name} {person.number}
            <button onClick={toggleDelete}>Delete</button>
          </li>        
    )
}

export default Persons