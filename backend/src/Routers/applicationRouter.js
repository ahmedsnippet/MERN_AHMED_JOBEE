import express from "express"
import { employerGetAllApplication, jobseekerDeleteApplication, jobseekerGetAllApplications, postApplication } from "../Controllers/applicationController.js"
import isAuthenticated from "../Middlewares/auth.js"

const applicationRouter = express.Router()

applicationRouter.get("/employer/getAll", isAuthenticated, employerGetAllApplication)
applicationRouter.get("/jobSeeker/getAll", isAuthenticated, jobseekerGetAllApplications)
applicationRouter.post("/postApplication", isAuthenticated, postApplication)
applicationRouter.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication)
export default applicationRouter