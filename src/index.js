import './setupEnv'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { io } from 'socket.io-client'

const BACKEND_URL = process.env.REACT_APP_BACKEND_ENDPOINT || 'http://localhost:3001'
const socket = io(BACKEND_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling']
})

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
)
