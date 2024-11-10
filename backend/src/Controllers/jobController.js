import { asyncHandler } from "../Utils/asyncHandler.js"
import apiError from "../Utils/apiError.js"
import { Job } from "../Models/jobModel.js"


const getAllJob = asyncHandler(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })
    res.status(200).json({
        sucess: true,
        jobs
    })
})


const postJob = asyncHandler(async (req, res, next) => {
    // First We Get User Role
    const { role } = req.user;

    if (role === "Job Seeker") {
        return next(new apiError("Job Seeker Is Not Allowed To This Resource", 400))
    }

    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body

    if (!title || !description || !category || !country || !city || !location) {
        return next(new apiError("Please Fullfill Form", 400))
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(
            new apiError(
                "Please either provide fixed salary or ranged salary.",
                400
            )
        );
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(
            new apiError("Cannot Enter Fixed and Ranged Salary together.", 400)
        );
    }
    // To Fetch Id Form Model
    const postedBy = req.user._id;

    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });
    res.status(200).json({
        success: true,
        message: "Job Posted Successfully!",
        job,
    });

})

const getMyJob = asyncHandler(async (req, res, next) => {
    const { role } = req.user

    if (role === "Job Seeker") {
        return next(new apiError("Job Seeker Is Not Allowed To This Resource", 400))
    }
    const myJobs = await Job.find({ postedBy: req.user._id })

    res.status(200).json({
        sucess: true,
        myJobs
    })
})

const updateJob = asyncHandler(async (req, res, next) => {
    const { role } = req.user

    if (role === "Job Seeker") {
        return next(new apiError("Job Seeker Is Not Allowed To This Resource", 400))
    }

    const { id } = req.params

    let job = await Job.findById(id)

    if (!job) {
        return next(new apiError("OOPS! Job not found.", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Job Updated!",
    });
})
const deleteJob = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new apiError("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new apiError("OOPS! Job not found.", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Deleted!",
    });
});
const deleteSingleJob = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new apiError("Job not found.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new apiError(`Invalid ID / CastError`, 404));
    }
})

const getSingleJob = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    try {
        const job = await Job.findById(id)
        if (!job) {
            return next(new apiError("Job Not Found", 404))
        }
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(new apiError("Invalid Id/ Caste Error", 400))
    }
})

export { postJob, getAllJob, getMyJob, updateJob, deleteJob, deleteSingleJob, getSingleJob }