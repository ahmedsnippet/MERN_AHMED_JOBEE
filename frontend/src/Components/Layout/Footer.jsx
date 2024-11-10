import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By @AHMED RAZA.</div>
      <div>
        <Link to={"https://youtube.com/@ahmedsnippet?si=p2fsS94r2OBdnNjK"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/public-profile"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/ahmedsnippet/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  )
}

export default Footer