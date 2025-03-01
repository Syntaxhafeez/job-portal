import express from "express";
import { changeJobApllicationsStatus, changeVisibility, getComapnyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerComapny } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Register a companny
router.post('/register', upload.single('image'), registerComapny)

// company login
router.post('/login', loginCompany)

// get company data
router.get('/company', protectCompany, getComapnyData)

//post a job
router.post('/post-job', protectCompany, postJob)

// get applicants data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

// get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

// change application status
router.post('/change-status', protectCompany, changeJobApllicationsStatus)

// chnage applications visibility
router.post('/change-visibility', protectCompany, changeVisibility)


export default  router;