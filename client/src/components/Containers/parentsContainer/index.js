import React from 'react'
import { ListItem } from '../../List'
import Card from '../../Card'
// import CheckInBtn from '../../Buttons'
// import Geolocated from '../../Geolocated'
import './style.css'

const ParentsContainer = ({
  name,
  relation,
  home,
  work,
  cell,
  email
}) => {
  // console.log('props:', props)

  return (
    <>
      <ListItem styling='list-inline-item m-0'>
        <Card styling='border-0'>
          <div className='card-body border-0'>
            <p className='card-title'>Name: {name}</p>
            <p className='card-title'>Relation: {relation}</p>
            <p className='card-title'>Home Phone: {home}</p>
            <p className='card-title'>Work Phone: {work}</p>
            <p className='card-title'>Cell Phone: {cell}</p>
            <p className='card-title'>Email: {email}</p>
          </div>
          {/* <div className='card-footer'>
            <CheckInBtn name={props.name} {...props} />
            <Geolocated  {...props} />
          </div> */}
        </Card>
      </ListItem>
    </>
  )
}

export default ParentsContainer
