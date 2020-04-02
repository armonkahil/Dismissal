import React from 'react'
import logo from './hsenrichment-houston-white-300px.png'

const Logo = () => {
  return (
    <a
      className='navbar-brand mr-auto'
      href='https://hsenrichment.harmonytx.org'
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={logo} width='100' height='54' alt='Harmony Logo' />
    </a>
  )
}
export default Logo
