import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ({style}) => {
  return (
    <nav className={style}>
        <ul>
            <li>
                <Link className='anclaOne' to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className='anclaTwo' to="/register">
                    Register
                </Link>
            </li>
        </ul>
    </nav>
  )
}