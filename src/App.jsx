import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Profile from './pages/Profile'
import SignOut from './pages/SignOut'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Error from './pages/Error'

function App() {
  return (
    <>
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
