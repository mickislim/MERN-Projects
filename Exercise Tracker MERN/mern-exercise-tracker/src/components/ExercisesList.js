import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date}</td>
    <td>
      <Link to={'/edit/' + props.exercise._id}>edit</Link> |
      <a href='#' onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </a>
    </td>
  </tr>
);




const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = () => {
    axios.get('http://localhost:3000/exercises/')
      .then(res => {
        setExercises(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:3000/exercises/${id}`)
      .then(res => {
        console.log(res.data);
        setExercises(exercises.filter(exercise => exercise._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const exerciseList = () => {
    return exercises.map((exercise) => (
      <Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise._id} />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  );
}

export default ExercisesList