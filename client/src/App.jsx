import React from 'react'
import SendVerification from './pages/auth/SendVerification'
import OtpVerify from './pages/auth/OtpVerify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InterviewReportHome from './pages/report/InterviewReportHome'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/send-verification" element={<SendVerification />} />
      <Route path="/verify-otp" element={<OtpVerify />} />
      <Route path="/interview-reports" element={<InterviewReportHome />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
