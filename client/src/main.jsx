import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Logout from './pages/Logout'
import './assets/css/tailwind.css'

import MainProvider from './contexts/Main'


ReactDOM.createRoot(document.getElementById('root')).render(
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:chat_id' element={<Chat />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/' element={<Home />} />
        <Route path='/settings/' element={<Settings />} />
        <Route path='/logout' element = {<Logout/>} />
      </Routes>
    </BrowserRouter>
  </MainProvider>

)
