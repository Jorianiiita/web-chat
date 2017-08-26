import React, { Component } from 'react'
import FriendList from './FriendList.jsx'

class LeftView extends Component {
  render () {
    return (
      <div className='left-view-container'>
        <form className='friend-search'>
          <input type='text' placeholder='Search' />
        </form>
        <FriendList />
      </div>
    )
  }
}

export default LeftView
