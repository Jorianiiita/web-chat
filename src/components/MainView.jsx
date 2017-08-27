import React, { Component } from 'react'
import io from 'socket.io-client'
import ChatInput from './ChatInput.jsx'
import MessageList from './MessageList.jsx'
import {SOCKET_HOST, API_HOST} from 'config'
import API from './../modules/api.js'

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.socket = io(SOCKET_HOST, { query: `username=${props.username}` }).connect();
    this.to = props.to
    this.id = 1
    this.from = props.username
    // Listen for messages from the server
    this.socket.on('new message', message => {
      console.log(message.from, this.to)
      if(message.from == this.to) {
        this.addMessage(message);
      }
    });
    this.getData = this.getData.bind(this)
    this.sendHandler = this.sendHandler.bind(this);
  }

  getData() {
    this.api =  new API({url: API_HOST + '/' + 'messages' + '/' + this.id})
    this.api.get().then((response) => {
      this.setState({
        messages: response.data.messages
      })
    })
  }

  componentDidMount () {
    // this.getData()
  }

  componentWillReceiveProps (nextProps) {
    this.id = nextProps.id
    this.to = nextProps.to
    this.setState({
      messages: []
    })
    // this.getData()
  }
  
  sendHandler(message) {
    const messageObject = {
      from: this.from,
      to: this.to,
      text: message
    };

    // Emit the message to the server
    this.socket.emit('send message', messageObject)
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    console.log(messages)
    this.setState({ messages });
  }

  render () {
    return (
      <div className='main-view-container'>
        <MessageList messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    )
  }
}

MainView.defaultProps = {
  username: 'Anonymous'
};

export default MainView
