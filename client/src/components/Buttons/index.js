import React from 'react'
// import socket.io client -- A client-side build of Socket.io
import openSocket from 'socket.io-client'
// open a webSocket on this port --this will change when deployed
import devSocket from '../../utils/setdev'

const socket = openSocket(devSocket)

// const componentDidMount = () => {
//   // test emits when the component mounts
//   this.handleLoadEmit('adminTime', this.state.timestamp)
//   this.handleLoadEmit('adminID', this.state.adminId)
//   this.setState({ adminId: 'Joe Clark' })
// }

const handleEmit = (method, data) => {
  // console.log('data:', data)
  // console.log('method:', method)
  // method is the websocket Tag, {message: data} is the data sent
  socket.emit(method, { message: data })
}
// const handleLoadEmit = (method, data) => {
//   console.log('data:', data)
//   console.log('method:', method)
//   if (data !== undefined) {
//     socket.emit(method, { message: data })
//   }
// }
// Socket.io Check In button
export default function CheckInBtn(props) {
  // console.log('checkIn props:', props)
  return (
    <>
      <div className='row container d-flex align-self-end'>
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-primary my-2'
            onClick={() =>
              handleEmit('/Admin/GeoArrived', {
                // change this however you want
                name: props.name, // Parent name goes here
                range: props.range,
                familyData: props.familyData // range of the parent to the school
              })
            }
          >
            Check In
          </button>
        </div>
      </div>
    </>
  )
}

export function GeoCheckInBtn(props) {
  return (
    <>
      <div className='row container d-flex align-self-end'>
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-primary my-2'
            onClick={() => handleEmit('arrived', props.name)}
          >
            Check In
          </button>
        </div>
      </div>
    </>
  )
}

export const SubmitBtn = ({ handleSubmit }) => {
  return (
    <>
      <div className='row container d-flex align-self-end'>
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-primary my-2 shadow p-3 mb-5 bg-white rounded'
            data-toggle='tooltip'
            data-placement='top'
            title='Tooltip on top'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}
