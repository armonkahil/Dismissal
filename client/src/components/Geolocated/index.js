import React from 'react'
import { geolocated } from 'react-geolocated'
import CheckInBtn from '../Buttons'

// const schoolLat = 35.785012099999996
// const schoolLon = -78.6602364
// const schoolLat = 35.7388228
// const schoolLon = -78.6010933
const schoolLat = 35.776706
const schoolLon = -78.645361

class Geolocation extends React.Component {
  render() {
    function distance(lat1, lon1, lat2, lon2, unit) {
      const radLat1 = (Math.PI * lat1) / 180
      const radLat2 = (Math.PI * lat2) / 180
      const theta = lon1 - lon2
      const radTheta = (Math.PI * theta) / 180
      let dist =
        Math.sin(radLat1) * Math.sin(radLat2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)
      if (dist > 1) {
        dist = 1
      }
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI
      dist = dist * 60 * 1.1515
      if (unit === 'K') {
        dist *= 1.609344
      }
      if (unit === 'N') {
        dist *= 0.8684
      }
      return dist
    }

    // console.log('Coords: ', this.props.coords)

    function createButton(props) {
      // console.log('geo props', props)
      let pickupLat = ''
      let pickupLon = ''

      if (props) {
        pickupLat = props.coords.latitude
        pickupLon = props.coords.longitude
      }

      const range = distance(
        schoolLat,
        schoolLon,
        pickupLat,
        pickupLon,
        'M'
      )

      // console.log('Range: ', range)
      if (range <= 0.5) {
        return (
          <CheckInBtn range={range} name={props.name} {...props} />
        )
      }
      return <h3>Not In Range to check in</h3>
    }

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      createButton(this.props)
    ) : (
      <div>Getting the location data&hellip; </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  watchPosition: true,
  userDecisionTimeout: 30000,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation,
  isOptimisticGeolocationEnabled: true
})(Geolocation)
