import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import ExercisesList from './components/ExercisesList';
import CreateExercises from './components/CreateExercises';
import CreateUser from './components/CreateUser';
import EditExercises from './components/EditExercises';




function App() {
  return (
<Router>
  <div className='container'>


  <Navbar/>
<br/>
<Routes>

<Route path='/' exact element={<ExercisesList/>}/> 
<Route path='/create' element={<CreateExercises/>}/>
<Route path='/user' element={<CreateUser/>} />
<Route path='/edit/:id' element={<EditExercises/>}/>
</Routes>
 


  </div>

</Router>
  );
}

export default App;
