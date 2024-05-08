import React, { useState } from 'react'
import axios from 'axios'


const CreateUser = () => {
  const [users,setUsers]= useState([])
const [username,setUsername] = useState('')


const handleSubmit =(e)=>{
e.preventDefault()

const newUser ={username} 

// Send POST request to add new user
axios.post('http://localhost:3000/users/add', newUser)
  .then((res) => {
    console.log(res.data); // Log response data
    // Add the new user to the local state
    setUsers([...users, newUser]);
    // Clear the input field after successful submission
    setUsername('');
  })
  .catch((error) => {
    console.error('Error adding user:', error); // Log error if request fails
  });
}


  return (
    <div>
<h3>Create New User</h3>

<form onSubmit={handleSubmit}>

  <div className='form-group'>
    <label>Username: </label>

<input type='text' required className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)} />

  </div>

  <div className='form-group'>
    <input type='submit' value='Create User' className='btn btn-primary' />
  </div>
</form>

    </div>
  )
}

export default CreateUser