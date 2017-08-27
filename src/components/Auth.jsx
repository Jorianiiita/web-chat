import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
  render () {
    if (!window.userData) {
      return <Redirect to='/' />
    }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Auth
