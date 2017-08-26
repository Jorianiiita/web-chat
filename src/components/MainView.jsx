import React, { Component } from 'react'

class MainView extends Component {
  render () {
    return (
      <div className='main-view-container'>
        <MessageForm />
      </div>
    )
  }
}

// TODO: need to make generic seperate form Component
class MessageForm extends Component {
  render () {
    return (
      <div className='message-form-wrapper'>
        <form className='message-form'>
          <input type='text' placeholder='Type a message' />
        </form>
      </div>
    )
  }
}

export default MainView
