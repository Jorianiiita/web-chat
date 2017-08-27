import React, { Component } from 'react'

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chatInput: '' 
    }
    this.submitHandler = this.submitHandler.bind(this)
    this.textChangeHandler = this.textChangeHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }
  
  render () {
    return (
      <div className='message-form-wrapper'>
        <form className="message-form" onSubmit={this.submitHandler}>
          <input type="text"
            onChange={this.textChangeHandler}
            value={this.state.chatInput}
            placeholder="Type a message..."
            autoFocus
            required />
        </form>
      </div>
      
    );
  }
}

export default ChatInput