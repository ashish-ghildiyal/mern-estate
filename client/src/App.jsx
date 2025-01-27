import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Profile from './pages/Profile'

import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Error from './pages/Error'
import Header from './components/Header'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
    <BrowserRouter>  
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
