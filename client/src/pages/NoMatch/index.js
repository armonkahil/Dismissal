import React from 'react'
import { Column, Row, Container } from '../../components/Grid'
import Jumbotron from '../../components/Jumbotron'

const NoMatch = () => {
  return (
    <Container>
      <Row styling='align-self-center justify-content-center'>
        <Column>
          <Jumbotron title='404 Page Not Found' lead='🙄' />
        </Column>
      </Row>
    </Container>
  )
}

export default NoMatch
