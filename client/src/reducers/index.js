import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import familyReducer from './familyReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  family: familyReducer
})
