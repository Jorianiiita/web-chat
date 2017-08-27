import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      friendsusername: '',
      loggedin: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    let name = e.target.getAttribute('name')
    let value = e.target.value
    this.setState((prevState) => {
      prevState[name] = value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    window.username = this.state.username
    window.friendsusername = this.state.friendsusername
    this.setState({
      loggedin: true
    })
  }

  render () {
    if (this.state.loggedin) {
      return (<Redirect to='/chat' />)
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type='text' onChange={this.onChange} value={this.state.username} name='username' placeholder='Enter your username' />
          <input type='text' onChange={this.onChange} value={this.state.friendsusername} name='friendsusername' placeholder='Enter comma seperated your friends name' />
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default Login
