import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux'
import { Row, Column } from './components/Grid'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
// Redux

import store from './store'
// Pages
import Dismissal from './pages/Dismissal'
import Database from './pages/Database'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import FamilyDashboard from './pages/FamilyDashboard'
import SocketBoilerPlate from './pages/socketBoilerPlate'
import AdminDashboard from './pages/AdminDashboard'
// import Example from './components/NewNavBar'

import 'animate.css/animate.css'

// Checking browser for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)

  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = '/'
  }
}

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Row className='justify-content-center' styling='mx-0'>
          <Column
            size='8'
            styling='container-fluid align-self-center justify-content-center'
          >
            <Router>
              <Navbar />
              {/* <Example /> */}
              <Switch>
                <Route exact path='/' component={Home} />
                <Route
                  exact
                  path='/dismissal'
                  component={Dismissal}
                />
                <Route exact path='/database' component={Database} />
                <Route exact path='/signup' component={SignUpPage} />
                <Route
                  exact
                  path='/family'
                  component={FamilyDashboard}
                />
                <Route
                  exact
                  path='/admin'
                  component={AdminDashboard}
                />
                <Route
                  exact
                  path='/socket'
                  component={SocketBoilerPlate}
                />
                <Route exact path='*' component={NoMatch} />
              </Switch>
            </Router>
          </Column>
        </Row>
      </Provider>
    )
  }
}

export default App
