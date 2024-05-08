import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'



const CreateExercises = () => {


  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: '',
    date: new Date(),
    users:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newExercise = { ...exercise, [name]: value };
    setExercise(newExercise);
    
  };

  const handleDateChange = (date) => {
    setExercise({ ...exercise, date }); // Update date directly
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setExercise({
      username: '',
      description: '',
      duration: '',
      date: new Date(),
      users: exercise.users,
    });
    
    
    axios.post('http://localhost:3000/exercises/add',exercise)
    .then(res => console.log(res.data))
    
    
    
    
    
    
    
    
    
    // Handle form submission logic here
    console.log('Form submitted:', exercise);
    // Reset form fields
   





  };

  useEffect(()=>{
    getUser()
  },[])

  const getUser=()=>{
    axios.get('http://localhost:3000/users')
    .then(res => {
      if (res.data.length > 0) {
        setExercise({
          ...exercise,
          users: res.data.map((user) => user.username),
          username: res.data[0].username, // Set default username
        });
      }
    })
    .catch(error => console.error('Error fetching users:', error));
};

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <select
            required
            className='form-control'
            name='username'
            value={exercise.username}
            onChange={handleChange}>
            {exercise.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Description:</label>
          <input
            type='text'
            required
            className='form-control'
            name='description'
            value={exercise.description}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Duration (in minutes):</label>
          <input
            type='text'
            className='form-control'
            name='duration'
            value={exercise.duration}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Date:</label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={handleDateChange} // Update date directly
            />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercises;
