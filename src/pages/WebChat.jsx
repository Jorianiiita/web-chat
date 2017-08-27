import React, { Component } from 'react'
import LeftView from './../components/LeftView.jsx'
import MainView from './../components/MainView.jsx'

class WebChat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phone: "",
      id: 1,
      username: "induja"
    }
    this.onFriendChange = this.onFriendChange.bind(this)
  }

  onFriendChange (phone, id, username) {
    this.setState({
      phone: phone,
      id: id,
      username: username
    })
  }

  render () {
    return (
      <div className='container'>
        <LeftView onFriendChange={this.onFriendChange}/>
        <MainView to={this.state.username} username={window.username} />
      </div>
    )
  }
}

export default WebChat
