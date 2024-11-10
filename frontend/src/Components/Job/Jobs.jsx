import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main"


const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const { isAuthorized } = useContext(Context)
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/jobs/getAllJobs", { withCredentials: true });
        setJobs(response.data);
      } catch (error) {
        console.log(error);
        if (!isAuthorized) {
          return navigateTo("/login");
        }
      }
    };
    fetchJobs();
  }, [isAuthorized]);




  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
            jobs.jobs && jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              )
            })
          }
        </div>
      </div>

    </section>
  )
}

export default Jobs