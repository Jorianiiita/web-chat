import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div className='header'>
        <div className='friend-image-wrapper'>
          <img className='friend-image' src={this.props.userData.image} />
        </div>
        <div>{this.props.userData.username}</div>
      </div>
    )
  }
}

export default Header
