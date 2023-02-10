import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes ,Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Feed from './pages/Feed'

import './assets/css/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/chat' element={<Chat/>} />
      <Route path='/profile/:username' element={<Profile/>} />
      <Route path='/feed' element={<Feed/>} />
    </Routes>
  </BrowserRouter>
)
