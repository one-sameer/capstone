const express = require("express");
const {
  createTemplate,
  getAllTemplates,
  getMyTemplates,
  getGenAdminTemplate,
  getGenAdminVehicleRequisitionTemplate,
  getSecurityCampusLeaveTemplate,
  getComputerCenterLdapAccountRequestTemplate,
  getFinanceProcurementRecommendationSanctionTemplate,
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

// Hardcoded General Administration Vehicle Requisition template
router.get(
  "/general-administration-vehicle-requisition-transport/template",
  protect,
  getGenAdminVehicleRequisitionTemplate
);

// Security – Campus Leaving Permission after 10:00 PM (For Female Students)
router.get("/security-campus-leave-permission-female/template", protect, getSecurityCampusLeaveTemplate);

// Computer Center – REQUEST / REQUISITION FORM (For LDAP Account)
router.get("/computer-center-ldap-account-request/template", protect, getComputerCenterLdapAccountRequestTemplate);

// Finance - Recommendation cum Sanction Sheet for Purchase (Double Bid Tendering - INR)
router.get(
  "/finance-procurement-recommendation-sanction-double-bid-inr/template",
  protect,
  getFinanceProcurementRecommendationSanctionTemplate
);

module.exports = router;