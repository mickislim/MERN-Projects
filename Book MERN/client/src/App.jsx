import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './routes/Home/home'
import About from './routes/About/About'
import Footer from './components/Footer'
import Header from './components/Header'
import Book from './routes/Book/Book'
import SingleBook from './routes/Book/SingleBook'
import CreateBook from './routes/Book/CreateBook'



function App() {

  return (
    <>
<Router>
<Header/>

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/book' element={<Book/>} />
    <Route path='/book/:slug' element={<SingleBook/>}/>
    <Route path='/createbook' element={<CreateBook/>}/>

  </Routes>

  <Footer/>
</Router>
    </>
  )
}

export default App
