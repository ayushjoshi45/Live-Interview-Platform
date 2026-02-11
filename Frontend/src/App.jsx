import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage';
import AboutPage from './pages/AboutPage';

function App() {
  const {isSignedIn} = useUser();
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/problem" element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
    </Routes>

    <Toaster position='top-right' toastOptions={{duration:3000}}/>
    
    </>
  )
}

export default App