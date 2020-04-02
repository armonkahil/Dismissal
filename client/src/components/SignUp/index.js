import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import FormContainer from '../Containers/FormContainer'
import { registerUser } from '../../actions/authActions'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      id: '',
      password: '',
      password2: '',
      family_id: '',
      errors: {},
      admin: 'false'
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dismissal')
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    // console.log('submit hit')
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      id: this.state.family_id,
      password: this.state.password,
      password2: this.state.password2,
      family_id: this.state.family_id
    }
    // console.log('new user', newUser)
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <FormContainer>
        <form onSubmit={this.onSubmit}>
          <h2 className='text-light'>Dismissed Sign Up</h2>
          {/* User Name */}
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.email
              })}
              type='text'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>
          {/* Password */}
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className='invalid-feedback'>
                {errors.password}
              </div>
            )}
          </div>
          {/* Password 2 */}
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.password2
              })}
              type='password'
              placeholder='Passwords must match'
              name='password2'
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className='invalid-feedback'>
                {errors.password2}
              </div>
            )}
          </div>
          {/* Family Id Code */}
          <div className='form-group'>
            <input
              className={classnames('form-control', {
                'is-invalid': errors.family_id
              })}
              type='text'
              placeholder='Family ID Code'
              name='family_id'
              value={this.state.family_id}
              onChange={this.onChange}
            />
            {errors.family_id && (
              <div className='invalid-feedback'>
                {errors.family_id}
              </div>
            )}
          </div>
          <button className='btn btn-success' type='submit'>
            Submit
          </button>
          <h3 className='text-light'>Hello {this.state.email}!</h3>
          <p className='text-light'>
            I probably shouldn't tell you this, but your password is
            {this.state.password}!
          </p>
        </form>
      </FormContainer>
    )
  }
}
Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(
  withRouter(Signup)
)
