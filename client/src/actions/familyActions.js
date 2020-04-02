import axios from 'axios'

import {
  GET_FAMILY,
  GET_FAMILIES,
  FAMILY_LOADING,
  CLEAR_CURRENT_FAMILY,
  GET_ERRORS,
  SET_CURRENT_USER,
  ADD_FAMILY_TO_WAITLIST
} from './types'

// family loading
export const setFamilyLoading = () => {
  return {
    type: FAMILY_LOADING
  }
}

// Get current family
export const getCurrentFamily = () => dispatch => {
  dispatch(setFamilyLoading())
  axios
    .get('/api/family')
    .then(res =>
      dispatch({
        type: GET_FAMILY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FAMILY,
        payload: {}
      })
    )
}

// Get family by handle
export const getFamilyById = id => dispatch => {
  dispatch(setFamilyLoading())
  axios
    .get(`/api/family/handle/${id}`)
    .then(res =>
      dispatch({
        type: GET_FAMILY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FAMILY,
        payload: null
      })
    )
}

// Create family
export const createFamily = (familyData, history) => dispatch => {
  axios
    .post('/api/family', familyData)
    .then(res => history.push('/family'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete account & family
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/family')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}


// Clear family
export const clearCurrentFamily = () => {
  return {
    type: CLEAR_CURRENT_FAMILY
  }
}
// Get all profiles
export const getFamilies = () => dispatch => {
  dispatch(setFamilyLoading())
  axios
    .get('/api/family/all')
    .then(res =>
      dispatch({
        type: GET_FAMILIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FAMILIES,
        payload: null
      })
    )
}

// Add family to waitList
export const addFamilyToWaitList = name => {
  return {
    type: ADD_FAMILY_TO_WAITLIST,
    payload: name
  }
}
