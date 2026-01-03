import React from 'react'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Routes, Route } from "react-router-dom";
import Profile from './pages/Profile.jsx';

const App = () => {
  return (
    <div className='min-h-screen w-full bg-zinc-950 text-white font-sans text-3xl'>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App