import mongoose from "mongoose";

const jobApplicationsSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'company', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Number, required: true }
})

const jobApplication = mongoose.model('JobApplication', jobApplicationsSchema)

export default jobApplication