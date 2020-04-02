import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import Card from '../../components/Card'
// import socket.io client -- A client-side build of Socket.io
// open a webSocket on this port --this will change when deployed
import devSocket from '../setdev'

const socket = openSocket(devSocket)

// "socket.on('Hello there', function()) ---listen for a data with a 'Hello there' tag, and then complete function---the function is whatever you want it to be or do.
// "socket.emit('Hello there', data) --- emit a broadcast to all browsers with a tag of 'Hello there'. data has to be in the form of an object ex. {data:'I Heard you'}
// whatever tag is used, it has to be added to "io" section in Server.js

class Admin extends Component {
  state = {
    adminId: 'Joe Clark',
    timestamp: new Date().toTimeString()
  }

  componentDidMount = () => {
    // test emits when the component mounts
    this.handleLoadEmit('adminTime', this.state.timestamp)
    this.handleLoadEmit('adminID', this.state.adminId)
    this.setState({ adminId: 'Joe Clark' })
  }

  handleEmit = (method, data) => {
    // console.log('data:', data)
    // console.log('method:', method)
    // method is the websocket Tag, {message: data} is the data sent
    socket.emit(method, { message: data })
  }

  handleLoadEmit = (method, data) => {
    // console.log('data:', data)
    // console.log('method:', method)
    if (data !== undefined) {
      socket.emit(method, { message: data })
    }
  }

  render() {
    // listen for data with a 'hello tag
    // socket.on('hello', data => console.log(data.message))
    return (
      <>
        <Card>
          <div className='card-body'>
            <h5 className='card-title'>Socket Emitter Test Admin</h5>
            <p className='card-text'>
              {this.state.adminId} is signed in. This is the timer
              value: {this.state.timestamp}
            </p>
            <button
              className='btn btn-primary'
              onClick={() =>
                this.handleEmit('adminGreet', 'i hate you all')
              }
            >
              I hate my job
            </button>
          </div>
        </Card>
      </>
    )
  }
}

export default Admin
