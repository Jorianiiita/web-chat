import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import WebChat from './pages/WebChat.jsx'
import Login from './pages/Login.jsx'

function NotFound () {
  return (
    <h2>404</h2>
  )
}

function App (props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact pathe='/chat' component={WebChat} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
