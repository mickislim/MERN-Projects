import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/react.svg'


const Header = () => {
  return (
    <header>
        <Link to='/' className='logo'> 
        <img src={logo} alt='reactJs' /> ReactJs</Link>

        <NavLink to='/' >Home</NavLink>
        <NavLink to='/book' >Books</NavLink>
        <NavLink to='/about' >About</NavLink>

    </header>
  )
}

export default Header