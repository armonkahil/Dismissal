import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = props => {
  return (
    <li className='nav-item active'>
      <Link className='nav-link navbar-text' to={props.to}>
        <p>{props.navTitle}</p>
      </Link>
    </li>
  )
}

export default NavLink
