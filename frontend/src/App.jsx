import React, { useEffect, useContext } from 'react'
import "./App.css"
import { Context } from "./main"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import Navbar from "./Components/Layout/Navbar"
import Footer from "./Components/Layout/Footer"
import Home from "./Components/Home/Home"
import Jobs from "./Components/Job/Jobs"
import JobDetails from "./Components/Job/JobDetails"
import PostJob from "./Components/Job/PostJob"
import MyJobs from "./Components/Job/MyJobs"
import Application from "./Components/Application/Application"
import MyApplications from "./Components/Application/MyApplications"
import NotFound from "./Components/NotFound/NotFound"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"


const App = () => {

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user/getUserDetails", { withCredentials: true })
        setUser(response.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    fetchUser()
  }, [isAuthorized])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  )
}

export default App