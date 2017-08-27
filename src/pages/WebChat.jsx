import React, { Component } from 'react'
import LeftView from './../components/LeftView.jsx'
import MainView from './../components/MainView.jsx'
import Auth from './../components/Auth.jsx'
import Header from './../components/Header.jsx'

class WebChat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: (window.userData) ? window.userData.friends[0] : null,
      username: (window.userData) ? window.userData.friendsUsername[0] : null
    }
    this.onFriendChange = this.onFriendChange.bind(this)
  }

  onFriendChange (id, username) {
    this.setState({
      userId: id,
      username: username
    })
  }

  render () {
    return (
      <Auth>
        <div className='container'>
          <LeftView userData={window.userData} onFriendChange={this.onFriendChange} />
          <div className='main-view-container'>
            <Header userData={window.userData} />
            <MainView userData={window.userData} toUserId={this.state.userId} toUserName={this.state.username} />
          </div>
        </div>
      </Auth>
    )
  }
}

export default WebChat
