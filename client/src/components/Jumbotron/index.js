import React from 'react'
import './style.css'

const Jumbotron = ({ children, title, lead }) => {
  return (
    <div className='jumbotron text-light my-3 d-none d-md-block'>
      <div className='text-center'>
        <h1 className='display-4 font-weight-bold'>{title}</h1>
        <h5 className='display-5 display-md-6'>
          <em>{lead}</em>
        </h5>
      </div>
      {children}
    </div>
  )
}

export default Jumbotron
