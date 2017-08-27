import React, { Component } from 'react'
import Message from './Message.jsx';

class MessageList extends Component {
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render () {
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          username={message.username}
          message={message.text}
          fromMe={message.fromMe} />
      );
    });

    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    )
  }
}

MessageList.defaultProps = {
  messages: []
};

export default MessageList