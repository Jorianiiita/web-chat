import React, { Component } from 'react'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={styles}>
        <h1>Welcome to React Bootstrap</h1>
      </div>
    )
  }
}

const styles = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate3d(-50%,-50%,0)'
}

export default Home
