import React from 'react'
import { FaUserPlus } from "react-icons/fa"
import { MdFindInPage } from "react-icons/md"
import { IoMdSend } from "react-icons/io"

const HowitWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h1>How Job We Works</h1>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis, in aspernatur sit alias mollitia.</p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post A Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis, in aspernatur sit alias mollitia.</p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Find a Job/Post A Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id veritatis, in aspernatur sit alias mollitia.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowitWorks