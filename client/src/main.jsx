import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes ,Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
  </BrowserRouter>
)
