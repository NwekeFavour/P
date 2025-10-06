import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Aos from 'aos';
import "aos/dist/aos.css";
import Apply from './pages/apply';
import Login from './pages/auth/login/login';
import Register from './pages/auth/signup/register';
import Int from './pages/int';
import ScrollToTop from './components/scrolltoTop';
import Premium from './pages/premium';
import Contact from './pages/contact';
import AdmindashboardPage from './pages/admin/dash';
import Users from './pages/admin/users';

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
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/techlaunchng/internships" element={<Apply />} /> 
        <Route path="/internship" element={<Int />} /> 
        <Route path="/contact-us" element={<Contact />} /> 
        <Route path="/premium" element={<Premium />} /> 
        <Route path="/sign-up" element={<Register />} /> 
        <Route path="/admin" element={<AdmindashboardPage />} /> 
        <Route path="/admin/users" element={<Users />} /> 
      </Routes>

    </>
  )
}

export default App
