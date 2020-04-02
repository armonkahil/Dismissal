import React from 'react'

const Dashboard = props => {
  return (
    <div className={`card animated fadeInUpBig ${props.styling}`}>
      {props.children}
    </div>
  )
}
export default Dashboard
