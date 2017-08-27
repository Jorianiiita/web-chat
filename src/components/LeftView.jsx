import React, { Component } from 'react'
import FriendList from './FriendList.jsx'

class LeftView extends Component {
  render () {
    return (
      <div className='left-view-container'>
        <FriendList userData={this.props.userData} onFriendChange={this.props.onFriendChange} />
      </div>
    )
  }
}

export default LeftView
