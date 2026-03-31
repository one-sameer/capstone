const express = require("express");
const {
  createTemplate,
  getAllTemplates,
  getMyTemplates,
  getGenAdminTemplate,
  getSecurityCampusLeaveTemplate,
  getSecurityDayScholarVehiclePermitTemplate,
  getSecurityMessWorkersTemplate,
  getSecurityPassRenewalTemplate,
  getSecurityEntryPassTemplate,
  getComputerCenterLdapAccountRequestTemplate,
} = require("../controllers/formController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create template
router.post("/templates", protect, createTemplate);

// Get all templates
router.get("/templates", protect, getAllTemplates);

// Get my templates
router.get("/templates/me", protect, getMyTemplates);

// Hardcoded General Administration Self Declaration template
router.get("/general-administration-self-declaration/template", protect, getGenAdminTemplate);

// Security – Campus Leaving Permission after 10:00 PM (For Female Students)
router.get("/security-campus-leave-permission-female/template", protect, getSecurityCampusLeaveTemplate);

// Security – Day Scholar Vehicle Permit & Parking Permission Form
router.get("/security-day-scholar-vehicle-permit/template", protect, getSecurityDayScholarVehiclePermitTemplate);

// Security – Mess Worker Initial Entry Form
router.get("/security-mess-workers/template", protect, getSecurityMessWorkersTemplate);

// Security – Pass Renewal (Domestic Help/Tutor/Driver/Supplier)
router.get("/security-pass-renewal/template", protect, getSecurityPassRenewalTemplate);

// Security – Entry Pass Requisition (Domestic Help/Tutor/Driver/Supplier)
router.get("/security-entry-pass/template", protect, getSecurityEntryPassTemplate);

// Computer Center – REQUEST / REQUISITION FORM (For LDAP Account)
router.get("/computer-center-ldap-account-request/template", protect, getComputerCenterLdapAccountRequestTemplate);

module.exports = router;