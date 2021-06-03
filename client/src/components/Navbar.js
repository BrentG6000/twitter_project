import React, { useContext, useState } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import UserProvider from '../contexts/UserProvider'
import Burger from './Burger'
import '../styles/App.scss'
import '../styles/navbar.scss'

function Navbar() {
    const [isActive, setActive] = useState(false)
    return (
        <nav>
            <ul className={`ul ${isActive ? 'active' : ''}`}>
                <Link to={'/'}>
                <li>
                    <div className='link'>Home</div>
                </li> 
                </Link>
                <Link to={'/Login'}>
                <li>
                    <div className='link'>Log In</div>
                </li> 
                </Link> 
                <Link to={'/Profile'}>
                <li>
                    <div className='link'>Profile</div>
                </li> 
                </Link> 
                <Link to={'/About'}>
                <li>
                    <div className='link'>About</div>
                </li> 
                </Link> 
            </ul>
            <Burger isActive={isActive} setActive={setActive}/>
        </nav>
    )
}
{/*  */}

export default Navbar