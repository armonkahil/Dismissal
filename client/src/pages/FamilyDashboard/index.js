/* eslint-disable quotes */
import React, { useState, useEffect } from 'react'
// import Jumbotron from '../components/Jumbotron'
import { useSelector } from 'react-redux'
import { Row, Column } from '../../components/Grid'
import FamilyContainer from '../../components/Containers/FamilyContainer'
import API from '../../utils/Api'
// import { usePosition } from 'use-position'
const FamilyDashboard = props => {
  // const {
  //   latitude,
  //   longitude,
  //   timestamp,
  //   accuracy,
  //   error,
  // } = usePosition(true, { enableHighAccuracy: true })
  // console.log('latitude:', latitude)
  // console.log('longitude:', longitude)
  // console.log('timestamp:', timestamp)
  // console.log('accuracy:', accuracy)
  // console.log('error:', error)

  const user = useSelector(state => state.auth.user)
  // const [familyId, setFamilyId] = useState(user.familyId)
  // const [allFamilies, setAllFamilies] = useState([]);
  // console.log("allFamilies:", allFamilies);
  const [singleFamilyData, setSingleFamilyData] = useState({})
  // console.log('singleFamilyData:', singleFamilyData)
  // console.log('user!!!!!!:', user)

  useEffect(() => {
    if (user) {
      // console.log('FAMILY ID', familyId)
      API.getFamilyById(user.familyId)
        .then(res => {
          // console.log(res)
          setSingleFamilyData(res)
        })
        .catch(err => console.log(err))
    }
  }, [user])

  // ===========================================================================
  //  Uncomment this to pull a single family
  // ===========================================================================
  // const getParent = () => {
  //   API.getFamilyById(familyId)
  //     .then(res => {
  //       console.log(res)
  //       setSingleParents(res)
  //     })
  //     .catch(err => console.log(err))
  // }

  // ===========================================================================
  // Uncomment this to pull all families
  // ===========================================================================
  // const getAllParents = () => {
  //   API.getAllFamilies()
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <div>
      <h1 className='text-center text-light'>Family Dashboard</h1>
      <Row styling='my-5'>
        <Column styling='align-self-center no-gutters'>
          <FamilyContainer familyData={singleFamilyData} />
        </Column>
      </Row>
    </div>
  )
}

export default FamilyDashboard
