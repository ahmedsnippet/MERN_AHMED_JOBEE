import express from "express"
import { deleteJob, deleteSingleJob, getAllJob, getMyJob, getSingleJob, postJob, updateJob } from "../Controllers/jobController.js"
import isAuthenticated from "../Middlewares/auth.js"

const jobRouter = express.Router()

jobRouter.get("/getAllJobs", getAllJob)
jobRouter.post("/postJob", isAuthenticated, postJob)
jobRouter.get("/getMyJob", isAuthenticated, getMyJob)
jobRouter.put("/updateJob/:id", isAuthenticated, updateJob)
jobRouter.delete("/deleteJob/:id", isAuthenticated, deleteJob)
jobRouter.delete("/deleteSingleJob/:id", isAuthenticated, deleteSingleJob)
jobRouter.get("/:id", isAuthenticated, getSingleJob)
export default jobRouter
