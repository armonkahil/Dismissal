import React, { Component } from 'react'
import Jumbotron from '../../components/Jumbotron'
import SignUp from '../../components/SignUp'

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <Jumbotron
          title='Dismissed'
          lead='Harmony School of Enrichment'
        />
        <SignUp />
      </div>
    )
  }
}

export default SignUpPage
