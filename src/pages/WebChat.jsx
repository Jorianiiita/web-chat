import React, { Component } from 'react'
import LeftView from './../components/LeftView.jsx'
import MainView from './../components/MainView.jsx'

class WebChat extends Component {
  render () {
    return (
      <div className='container'>
        <LeftView />
        <MainView />
      </div>
    )
  }
}

export default WebChat
