import React from 'react'

const Notification = ({ status, message }) => {
    //console.log("notification status", status)
    //console.log("notification messsage", message)
    if (message === undefined || message === null) {
      return null
    }
    
    if (status === 'error'){
        return (
            <div className='error'>
              {message}
            </div>
          )
    }
    else{
        return (
            <div className='info'>
              {message}
            </div>
          )
    }
    
  }

export default Notification