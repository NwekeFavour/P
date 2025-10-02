import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Aos from 'aos';
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,  // animation duration (default: 400)
      once: true,      // whether animation should happen only once
      easing: "ease-in-out", // smooth animation
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes>

    </>
  )
}

export default App
