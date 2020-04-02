import React from 'react'
// import Jumbotron from '../components/Jumbotron'
import { Row, Column, Container } from '../../components/Grid'
import Admin from '../../utils/socket/admin'
import Parents from '../../utils/socket/parents'

const Database = props => {
  return (
    <>
      <Container>
        <Row styling='row align-self-center'>
          <Column>
            {/* <Jumbotron title='Welcome to Harmony' lead='Database' /> */}
          </Column>
        </Row>
        <Row>
          <Admin {...props} />
          <Parents {...props} />
        </Row>
      </Container>
    </>
  )
}

export default Database
