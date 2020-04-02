import React from 'react'
import { Row, Column } from '../../components/Grid'
import Waiting from '../../components/Containers/WaitingContainer'

const Dismissal = () => {
  return (
    <>
      <h1 className='text-center text-light'>Waitlist</h1>
      <Row styling='row align-self-center'>
        <Column>
          {/* <Jumbotron title='Welcome to Harmony' lead='Dismissal' /> */}
        </Column>
      </Row>
      <Waiting />
    </>
  )
}

export default Dismissal
