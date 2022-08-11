import React from 'react'
    
const Filter = (props) => {

    const handleSearchChange = (event) => {
        props.setSearchText(event.target.value)
    }
    return(
        <div>
            filter shown with <input onChange={handleSearchChange}/>
        </div>
    )
}

export default Filter