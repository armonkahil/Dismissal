import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import familyTestData from './testData'
import Card from '../../components/Card'
import devSocket from '../setdev'

const socket = openSocket(devSocket)

class Parents extends Component {
  state = {
    familyId: familyTestData,
    timestamp: new Date().toTimeString(),
    message: 'The Shade family is here to pickup Eva Browell.'
  }

  componentDidMount() {
    this.handleLoadEmit('testTime', this.state.timestamp)
    this.handleLoadEmit('testFamily', this.state.familyId.lastName)
    this.handleLoadEmit('arrived', this.state.message)
  }

  handleEmit = function (method, data) {
    // console.log('data:', data)
    // console.log('method:', method)
    socket.emit(method, { message: data })
  }

  handleLoadEmit = function (method, data) {
    // console.log('data:', data)
    // console.log('method:', method)
    if (data !== undefined) {
      socket.emit(method, { message: data })
    }
  }

  render() {
    return (
      <>
        <Card>
          <div className='card-body'>
            <h5 className='card-title'>
              Socket Emitter Test Parents
            </h5>
            <p className='card-text'>
              {this.state.message}
              <br />
              This is the timer value: {this.state.timestamp}
            </p>
            <button
              className='btn btn-primary'
              onClick={() =>
                this.handleEmit('arrived', this.state.message)
              }
            >
              I'm here
            </button>
          </div>
        </Card>
      </>
    )
  }
}

export default Parents
