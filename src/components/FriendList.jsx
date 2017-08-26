import React, { Component } from 'react'
import {API_HOST} from 'config'
import API from './../modules/api'

class FriendList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  getData () {
    let api = new API({url: API_HOST + '/' + 'friend'})
    api.get().then((response) => {
      this.setState({
        data: response.data
      })
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    let friendList = this.state.data.map((friend) => {
      return <FriendView key={friend.id} data={friend} />
    })
    return (
      <div className='friend-list-container'>
        {friendList}
      </div>
    )
  }
}

function FriendView (props) {
  return (
    <div className='friend-container'>
      <div className='friend-image-wrapper'>
        <img className='friend-image' src={props.data.image} />
      </div>
      <div className='friend-right-view'>
        <div className='friend-name-time'>
          <div className='friend-name'>{props.data.name}</div>
          <div className='friend-time'>{props.data.timestamp}</div>
        </div>
        <div>{props.data.text}</div>
      </div>
    </div>
  )
}

export default FriendList
