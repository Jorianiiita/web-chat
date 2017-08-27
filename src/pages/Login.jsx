import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import API from './../modules/api'
import {API_HOST} from 'config'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: null,
      loggedin: false,
      userFetched: false,
      error: null,
      loading: false
    }
    this.users = []
    this.api = new API({url: API_HOST + '/' + 'users'})
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    this.api.get().then((response) => {
      this.users = response.data
      this.setState({
        userFetched: true,
        loading: false
      })
    })
    .catch((err) => {
      this.setState({
        error: err.message
      })
    })
  }

  onChange (e) {
    let name = e.target.getAttribute('name')
    let value = e.target.value
    this.setState((prevState) => {
      prevState[name] = value
    })
  }

  getUser (id, users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) { return users[i] }
    }
    return null
  }

  onSubmit (e) {
    e.preventDefault()
    let userData = this.getUser(this.state.userId, this.users)
    userData.friendsUsername = []
    this.users.forEach((user) => {
      let matchedIndex = userData.friends.indexOf(user.id)
      if (matchedIndex > -1) {
        userData.friendsUsername[matchedIndex] = user.username
      }
    })
    window.userData = userData
    this.setState({
      loggedin: true
    })
  }

  render () {
    if (this.state.loggedin) {
      return (<Redirect to='/chat' />)
    }
    if (this.state.loading) {
      return (<div className='login-container'>Loading &hellip;</div>)
    }
    let selectField = null
    let errorText = null
    let selectOptions = this.users.map((user, i) => {
      return <option key={i} value={user.id} >{user.username}</option>
    })
    if (selectOptions && selectOptions.length) {
      selectOptions.unshift(<option key={selectOptions.length} value='' disabled selected>Choose your username</option>)
      selectField = (<select className='select-username' required onChange={this.onChange} name='userId' >{selectOptions}</select>)
    }
    if (this.state.error) {
      errorText = (<div className='error-message'>{this.state.error}</div>)
    }
    return (
      <div className='login-container'>
        {errorText}
        <form className='login-form' onSubmit={this.onSubmit}>
          {selectField}
          <input className='login-submit' type='submit' />
        </form>
      </div>
    )
  }
}

export default Login
