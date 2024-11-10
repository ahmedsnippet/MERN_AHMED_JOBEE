import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/jobs/${id}`, { withCredentials: true })
        setJob(response.data.job)
      } catch (error) {
        navigateTo("/notfound");
      }
    }
    fetchJob()
  }, [])
  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <div className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>title : <span>{job.title}</span> </p>
          <p>Category : <span>{job.category}</span> </p>
          <p>Country : <span>{job.country}</span> </p>
          <p>City : <span>{job.city}</span> </p>
          <p>Location : <span>{job.location}</span> </p>
          <p>Description : <span>{job.decription}</span> </p>
          <p>Job Posted On : <span>{job.jobPstedOn}</span> </p>
          <p>Salary : {" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetails