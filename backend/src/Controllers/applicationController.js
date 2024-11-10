import { asyncHandler } from "../Utils/asyncHandler.js"
import apiError from "../Utils/apiError.js"
import { Application } from "../Models/applicationModel.js"
import { Job } from "../Models/jobModel.js"
import cloudinary from "cloudinary";


const employerGetAllApplication = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new apiError("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const { id } = req.user;
    const applications = await Application.find({ "employerID.user": id });
    res.status(200).json({
        success: true,
        applications,
    });
})
const jobseekerGetAllApplications = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new apiError("Employer not allowed to access this resource.", 400)
        );
    }
    const { id } = req.user;
    const applications = await Application.find({ "applicantID.user": id });
    res.status(200).json({
        success: true,
        applications,
    });
})
const postApplication = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new apiError("Employer not allowed to access this resource.", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new apiError("Resume File Is Required!"))
    }
    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new apiError("Invalid file type. Please upload a PNG file.", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath)
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new apiError("Failed to upload Resume to Cloudinary", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };
    if (!jobId) {
        return next(new apiError("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new apiError("Job not found!", 404));
    }
    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return next(new apiError("Please fill all fields.", 400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
})
const jobseekerDeleteApplication = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new apiError("Employer not allowed to access this resource.", 400)
        );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new apiError("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted!",
    });
}
);

export { postApplication, employerGetAllApplication, jobseekerGetAllApplications, jobseekerDeleteApplication }