import React from 'react'

const Card = ({ children, styling }) => {
  return (
    <div className={`card animated ${styling} border-0`}>
      {children}
    </div>
  )
}
export default Card
