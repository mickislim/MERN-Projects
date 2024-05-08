import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercises = (props) => {
  const [exercise, setExercise] = useState({
    username: '',
    description: '',
    duration: '',
    date: new Date(),
    users: [],
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newExercise = { ...exercise, [name]: value };
    setExercise(newExercise);
  };

  const handleDateChange = (date) => {
    setExercise({ ...exercise, date });
  };

  const editExercise = () => {
    
    axios.get(`http://localhost:3000/exercises/${props.match.params.id}`)
      .then(res => {
        if (res.data.length > 0) {
          setExercise({
            ...exercise,
            username: res.data[0].username,
            description: res.data[0].description,
            duration: res.data[0].duration,
            date: new Date(res.data[0].date),
            users: res.data.map((user) => user.username),
          });
        }
      })
      .catch(error => console.error('Error fetching exercise:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:3000/exercises/update/${props.match.params.id}`, exercise)
      .then(res => console.log(res.data))
      .catch(error => console.error('Error updating exercise:', error));

    window.location = '/'; // Redirect to home after submission
  };

  useEffect(() => {
    editExercise();
  }, [])

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Update Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercises;
