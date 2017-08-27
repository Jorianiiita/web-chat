import React, { Component } from 'react'
import io from 'socket.io-client'
import ChatInput from './ChatInput.jsx'
import MessageList from './MessageList.jsx'
import {SOCKET_HOST, API_HOST} from 'config'
import API from './../modules/api.js'
import db from './../modules/db.js'

class MainView extends Component {
  constructor (props) {
    super(props)
    this.state = { messages: [] }
    this.socket = io(SOCKET_HOST, { query: `username=${props.username}` }).connect()
    this.to = props.to
    this.id = 1
    this.from = props.username

    // Listen for messages from the server
    this.socket.on('new message', message => {
      if (message.from === this.to) {
        this.addMessage(message)
      }
    })
    this.getData = this.getData.bind(this)
    this.getDataFromDB = this.getDataFromDB.bind(this)
    this.sendHandler = this.sendHandler.bind(this)
  }

  getData () {
    this.api = new API({url: API_HOST + '/' + 'messages' + '/' + this.id})
    this.api.get().then((response) => {
      this.setState({
        messages: response.data.messages
      })
    })
  }

  getDataFromDB () {
    let p1 = db.table('messages')
      .where('from').equalsIgnoreCase(this.from)
      .and((message) => { return (message.to === this.to) })
      .sortBy('timestamp')
      .then((messages) => {
        return Promise.resolve(messages)
      })
    let p2 = db.table('messages')
      .where('from').equalsIgnoreCase(this.to)
      .and((message) => { return (message.to === this.from) })
      .sortBy('timestamp')
      .then((messages) => {
        return Promise.resolve(messages)
      })

    Promise.all([p1, p2]).then((value) => {
      let messages = value[0].concat(value[1])
      messages.sort((mssg1, mssg2) => {
        return mssg1.timestamp - mssg2.timestamp
      })
      this.setState({
        messages: messages
      })
    })
  }

  componentDidMount () {
    // this.getData()
    this.getDataFromDB()
  }

  componentWillReceiveProps (nextProps) {
    this.id = nextProps.id
    this.to = nextProps.to
    this.setState({
      messages: []
    })
    this.getDataFromDB()
    // this.getData()
  }

  sendHandler (message) {
    const messageObject = {
      from: this.from,
      to: this.to,
      text: message,
      timestamp: Date.now()
    }

    // Add message to db
    db.table('messages')
    .add(messageObject)
    .then((id) => {
      messageObject.id = id
      this.socket.emit('send message', messageObject) // Emit the message to the server
      this.addMessage(messageObject)
    })
  }

  addMessage (message, addTo) {
    // Append the message to the component state
    const messages = this.state.messages
    messages.push(message)
    this.setState({ messages })
  }

  render () {
    return (
      <div className='main-view-container'>
        <MessageList username={this.from} messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    )
  }
}

export default MainView
