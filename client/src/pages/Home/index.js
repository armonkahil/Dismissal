import React, { PureComponent } from 'react'
import Jumbotron from '../../components/Jumbotron'
import Login from '../../components/Login/index'
// import { Container } from '../../components/Grid'

class Home extends PureComponent {
  render() {
    return (
      <div className='overflow-auto'>
        <Jumbotron
          title='Dismissed'
          lead='Harmony School of Enrichment'
        />
        <Login />
      </div>
    )
  }
}

export default Home
