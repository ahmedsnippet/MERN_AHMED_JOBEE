import React, { useContext } from 'react'
import { Context } from "../../main"
import { Navigate } from 'react-router-dom'
import HeroSection from "../Home/HeroSection"
import HowitWorks from "../Home/HowitWorks"
import PopularCategory from "../Home/PopularCategory"
import PopularCompanies from "../Home/PopularCompanies"

const Home = () => {
  const { isAuthorized } = useContext(Context)
  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }
  return (
    <section className='homePage page'>
      <HeroSection />
      <HowitWorks />
      <PopularCategory />
      <PopularCompanies />
    </section>
  )
}

export default Home