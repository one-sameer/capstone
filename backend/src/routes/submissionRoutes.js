const express = require("express");
const router = express.Router();

const {
  submitForm,
  getMySubmissions,
  generateSubmissionPDF,
} = require("../controllers/submissionController");

const protect = require("../middleware/authMiddleware");

// Submit form
router.post("/", protect, submitForm);

// Get my submissions
router.get("/me", protect, getMySubmissions);

// Generate PDF for a submission
router.get("/pdf/:templateId", protect, generateSubmissionPDF);

module.exports = router;