import React from 'react'
import openSocket from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Column } from '../../Grid'
import Card from '../../Card'
import { addFamilyToWaitList } from '../../../actions/familyActions'
// import socket.io client -- A client-side build of Socket.io
// open a webSocket on this port --this will change when deployed
import devSocket from '../../../utils/setdev'

const socket = openSocket(devSocket)

const Waiting = () => {
  const dispatch = useDispatch()
  const waitList = useSelector(state => state.family.waitList)
  // console.log('waitList:', waitList)

  socket.on('/waiting', data => {
    // console.log(JSON.stringify(data, null, 2))
    if (!waitList.includes(data.message.name)) {
      dispatch(addFamilyToWaitList(data.message.name))
    }
    // setWaitList([data.message.name]);
  })
  // console.log("waitList checking", waitList);
  return (
    <>
      <Row styling='justify-content-center'>
        <Column styling='align-self-center no-gutters'>
          <Card>
            <div className='card-body container'>
              {waitList.length > 0 ? (
                waitList.map((family, index) => (
                  <>
                    <h5 key={index}>The {family} family is here.</h5>
                    {/* {family.students.map((student, index) => (
                        <h2 key={index}>{`${student.firstName} ${student.lastName}`}</h2>
                      ))} */}
                  </>
                ))
              ) : (
                <h5>No parents waiting.</h5>
              )}
            </div>
          </Card>
        </Column>
      </Row>
    </>
  )
}

export default Waiting
