import jobApplication from "../models/jobApplications.js"
import user from "../models/user.js"
import {v2 as cloudinary} from 'cloudinary'


// get user data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId

    try {
        const user = await user.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User Not found!" })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//  Apply for a job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body

    const userId = req.auth.userId

    try {
        const isAlreadyApplied = await jobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            res.json({ success: false, message: "Job not found!" })
        }

        await jobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const  userId = req.auth.userId

        const applications = jobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()

        if (!applications) {
            return res.json({success: false, message: "No job applications found on this user"})
        }

        return res.json({success: true, applications})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//  update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId

        const resumeFile = req.file

        const userData = await user.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success: true, message: "Resume Updated"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


