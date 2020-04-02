import React from 'react'
import { Row, Column } from '../../Grid'

const FormContainer = ({ children }) => {
  return (
    <Row styling='justify-content-center mx-0'>
      <Column size='sm-12 md-4 lg-4 xl-4'>{children}</Column>
    </Row>
  )
}
export default FormContainer
