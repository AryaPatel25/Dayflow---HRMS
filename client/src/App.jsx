import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Attendance from './pages/Attendance'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/" element={<Attendance />} />
      </Routes>
    </Router>
  )
}

export default App