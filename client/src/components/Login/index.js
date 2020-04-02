import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
// packages allows conditionals in classNames
import classnames from 'classnames'
import { loginUser } from '../../actions/authActions'
import FormContainer from '../Containers/FormContainer'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      user: {},
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.admin) {
        this.props.history.push('/admin')
      } else {
        this.props.history.push('/family')
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/family')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // when submit button is clicked
  onSubmit(e) {
    // console.log('submit hit')
    e.preventDefault()

    const userData = {
      username: this.state.username,
      password: this.state.password
    }
    console.log('UserData', userData)
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state
    // console.log('errors', errors)
    return (
      <FormContainer>
        <form onSubmit={this.onSubmit}>
          <h2 className='text-light'>Login</h2>
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.username
              })}
              type='text'
              placeholder='Username'
              name='username'
              onChange={this.onChange}
              id='username'
            />
            {errors.username && (
              <div className='invalid-feedback'>
                {errors.username}
              </div>
            )}
          </div>
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
              type='password'
              placeholder='Password'
              name='password'
              onChange={this.onChange}
            />
            {errors.password && (
              <div className='invalid-feedback'>
                {errors.password}
              </div>
            )}
          </div>
          <div>
            <button className='btn btn-success my-2' type='submit'>
              Submit
            </button>
            <Link
              className='nav-link float-right text-light'
              to='/signup'
              path='/signup'
            >
              Sign Up
            </Link>
          </div>
        </form>
      </FormContainer>
    )
  }
}
// defining propTypes
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
// mapping global state to local state
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(
  withRouter(Login)
)
