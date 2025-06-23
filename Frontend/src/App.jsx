import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Forms from './Components/Forms/Form'
import Form from './Components/Forms/Form'
import RoomPage from './Pages/RoomPage/RoomPage'

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/:roomId" element={<RoomPage/>} />
      </Routes>
    </div>
  )
}

export default App