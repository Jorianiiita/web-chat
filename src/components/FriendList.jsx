import React, { Component } from 'react'
import {API_HOST} from 'config'
import API from './../modules/api'
import {getParentNodeWithClass} from './../modules/lib.js'

class FriendList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      search: ''
    }
    let query = this.props.userData.friends.map((id) => {
      return `id=${id}`
    })
    this.api = new API({url: API_HOST + '/' + 'users?' + query.join('&')})
    this.onFriendChange = this.onFriendChange.bind(this)
    this.onFriendSearch = this.onFriendSearch.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  getData (params) {
    this.api.get(params).then((response) => {
      this.setState({
        data: response.data
      })
    })
  }

  componentDidMount () {
    this.getData()
  }

  onFriendChange (e) {
    e.stopPropagation()
    let friendsList = document.getElementsByClassName('friend-container')
    Array.prototype.slice.call(friendsList).map((friend) => {
      friend.style.backgroundColor = '#fff'
    })
    let parentNode = getParentNodeWithClass(e.target, 'friend-container')
    parentNode.style.backgroundColor = '#eee'
    this.props.onFriendChange(parentNode.getAttribute('data-id'), parentNode.getAttribute('data-username'))
  }

  onFriendSearch (e) {
    e.preventDefault()
    this.getData({q: this.state.search})
  }

  onChange (e) {
    this.setState({
      search: e.target.value
    })
  }

  render () {
    let friendList = this.state.data.map((friend) => {
      return <FriendView key={friend.id} data={friend} />
    })
    return (
      <div>
        <form className='friend-search' onSubmit={this.onFriendSearch}>
          <input type='text' value={this.state.search} onChange={this.onChange} placeholder='Search' />
        </form>
        <div className='friend-list-container' onClick={this.onFriendChange}>
          {friendList}
        </div>
      </div>
    )
  }
}

function FriendView (props) {
  return (
    <div className='friend-container' data-id={props.data.id} data-username={props.data.username}>
      <div className='friend-image-wrapper'>
        <img className='friend-image' src={props.data.image} />
      </div>
      <div className='friend-right-view'>
        {props.data.username}
      </div>
    </div>
  )
}

export default FriendList
