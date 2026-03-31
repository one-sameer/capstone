const FormTemplate = require("../models/FormTemplate");

const GEN_ADMIN_TEMPLATE_CODE = "gen-admin";
const SECURITY_CAMPUS_LEAVE_FEMALE_CODE = "security-campus-leave-female";
const SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_CODE = "security-day-scholar-vehicle-permit";
const SECURITY_MESS_WORKERS_CODE = "security-mess-workers";
const SECURITY_PASS_RENEWAL_CODE = "security-pass-renewal";
const SECURITY_ENTRY_PASS_CODE = "security-entry-pass";
const CC_LDAP_ACCOUNT_REQUEST_CODE = "cc-ldap-account-request";

const SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE = {
  code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE,
  title: "Campus Leaving Permission after 10:00 PM (For Female Students)",
  description: "Permission form for female students leaving IIT Patna campus after 10:00 PM.",
  section: "security",
  fields: [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Roll No", name: "rollNo", type: "text", required: true },
    { label: "Hostel Name", name: "hostelName", type: "text", required: true },
    { label: "Gender", name: "gender", type: "text", required: false },
    { label: "Date of Leaving", name: "dateOfLeaving", type: "date", required: true },
    { label: "Reason for Leaving", name: "reasonForLeaving", type: "textarea", required: true },
    { label: "Companion 1 Name", name: "companion1Name", type: "text", required: false },
    { label: "Companion 1 Roll No", name: "companion1RollNo", type: "text", required: false },
    { label: "Companion 2 Name", name: "companion2Name", type: "text", required: false },
    { label: "Companion 2 Roll No", name: "companion2RollNo", type: "text", required: false },
  ],
  approvalStages: [],
};

const SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_TEMPLATE = {
  code: SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_CODE,
  title: "Day Scholar Vehicle Permit & Parking Permission Form",
  description: "IIT Patna day scholar vehicle permit and parking permission form for campus entry.",
  section: "security",
  fields: [
    { label: "Name & Roll Number", name: "nameRollNumber", type: "text", required: true },
    { label: "Mobile Number", name: "mobileNumber", type: "text", required: true },
    { label: "Institute Email", name: "instituteEmail", type: "text", required: false },
    { label: "Department", name: "department", type: "text", required: true },
    { label: "Owner Name", name: "ownerName", type: "text", required: true },
    { label: "Owner Relationship", name: "ownerRelationship", type: "text", required: false },
    { label: "Vehicle Registration Number (RC)", name: "vehicleRegNo", type: "text", required: true },
    { label: "Engine Number", name: "engineNumber", type: "text", required: false },
    { label: "Chassis Number", name: "chassisNumber", type: "text", required: false },
    { label: "Type of Vehicle", name: "vehicleType", type: "select", required: true, options: ["Car", "Bike", "Scooter", "Other"] },
    { label: "Residential Address", name: "residentialAddress", type: "textarea", required: true },
  ],
  approvalStages: [],
};

const SECURITY_MESS_WORKERS_TEMPLATE = {
  code: SECURITY_MESS_WORKERS_CODE,
  title: "Mess Worker Initial Entry Form",
  description: "Request form for entry of mess vendor/workers into IIT Patna campus.",
  section: "security",
  fields: [
    { label: "Hostel Name", name: "hostelName", type: "text", required: true },
    { label: "Vendor Representative Name", name: "vendorName", type: "text", required: true },
    { label: "Worker 1 Name", name: "worker1Name", type: "text", required: true },
    { label: "Worker 1 Aadhar", name: "worker1Aadhar", type: "text", required: true },
    { label: "Worker 2 Name", name: "worker2Name", type: "text", required: false },
    { label: "Worker 2 Aadhar", name: "worker2Aadhar", type: "text", required: false },
    { label: "Worker 3 Name", name: "worker3Name", type: "text", required: false },
    { label: "Worker 3 Aadhar", name: "worker3Aadhar", type: "text", required: false },
    { label: "Worker 4 Name", name: "worker4Name", type: "text", required: false },
    { label: "Worker 4 Aadhar", name: "worker4Aadhar", type: "text", required: false },
    { label: "Worker 5 Name", name: "worker5Name", type: "text", required: false },
    { label: "Worker 5 Aadhar", name: "worker5Aadhar", type: "text", required: false },
    { label: "Worker 6 Name", name: "worker6Name", type: "text", required: false },
    { label: "Worker 6 Aadhar", name: "worker6Aadhar", type: "text", required: false },
  ],
  approvalStages: [],
};

const SECURITY_PASS_RENEWAL_TEMPLATE = {
  code: SECURITY_PASS_RENEWAL_CODE,
  title: "Requisition for Renewal of Entry Pass",
  description: "Renewal of entry pass for Domestic Help/Tutor/Driver/Supplier at IIT Patna.",
  section: "security",
  fields: [
    { label: "Name of the Applicant", name: "applicantName", type: "text", required: true },
    { label: "Date", name: "date", type: "date", required: false },
    { label: "Flat No.(s)", name: "flatNo", type: "text", required: false },
    { label: "Mobile No.", name: "mobileNo", type: "text", required: false },
    { label: "Pass Number", name: "passNumber", type: "text", required: true },
    { label: "Name & Mobile No. of the Pass Holder", name: "passHolderNameMobile", type: "text", required: false },
  ],
  approvalStages: [],
};

const SECURITY_ENTRY_PASS_TEMPLATE = {
  code: SECURITY_ENTRY_PASS_CODE,
  title: "Form for Entry Pass: Domestic Help/Tutor/Driver/Supplier",
  description: "Requisition form for entry pass for domestic help, tutor, driver or supplier at IIT Patna.",
  section: "security",
  fields: [
    { label: "Name of the Applicant",                   name: "applicantName",           type: "text",  required: true  },
    { label: "Employee No.",                             name: "employeeNo",              type: "text",  required: false },
    { label: "Designation",                              name: "designation",             type: "text",  required: false },
    { label: "Department/Section",                       name: "department",              type: "text",  required: false },
    { label: "Email id",                                 name: "emailId",                type: "text",  required: false },
    { label: "Flat No.",                                 name: "flatNo",                 type: "text",  required: false },
    { label: "Mobile No.",                               name: "mobileNo",               type: "text",  required: false },
    { label: "Name of Domestic Help/Tutor/Driver/Supplier", name: "helperName",          type: "text",  required: true  },
    { label: "Aadhar Card/ Photo Id No.",                name: "helperAadhar",           type: "text",  required: false },
    { label: "Helper Mobile No.",                        name: "helperMobileNo",         type: "text",  required: false },
    { label: "Visible identification mark",              name: "visibleIdentificationMark", type: "text", required: false },
    { label: "Employed as",                              name: "employedAs",             type: "text",  required: false },
    { label: "Campus entry & exit time",                 name: "campusEntryExitTime",    type: "text",  required: false },
  ],
  approvalStages: [],
};

const CC_LDAP_ACCOUNT_REQUEST_TEMPLATE = {
  code: CC_LDAP_ACCOUNT_REQUEST_CODE,
  title: "REQUEST / REQUISITION FORM (For LDAP Account)",
  description: "Computer Center request/requisition form for LDAP account creation (project staff/temporary staff).",
  section: "cc",
  fields: [
    { label: "Emp. ID/Project ID", name: "empIdProjectId", type: "text", required: true },
    { label: "Full Name", name: "fullName", type: "text", required: true },
    { label: "Dept./Section/Centre", name: "department", type: "text", required: true },
    { label: "Phone/Mobile No.", name: "phoneMobileNo", type: "text", required: true },
    { label: "Personal Email-ID", name: "personalEmailId", type: "text", required: true },
    { label: "Address", name: "address", type: "textarea", required: true },
    { label: "IITP Email id (If any)", name: "iitpEmailId", type: "text", required: false },
    { label: "Validity date / Last Date for LDAP account", name: "validityLastDate", type: "date", required: true },
    { label: "Date", name: "requestDate", type: "date", required: true },
  ],
  approvalStages: [],
};

const getGenAdminTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: GEN_ADMIN_TEMPLATE_CODE });

    if (!template) {
      template = await FormTemplate.create({
        code: GEN_ADMIN_TEMPLATE_CODE,
        title: "General Administration Self-Declaration",
        description: "A self-declaration form for general administration purposes.",
        fields: [
          { label: "Salutation", name: "salutation", type: "select", required: true, options: ["Dr.", "Mr.", "Ms."] },
          { label: "Full Name", name: "fullName", type: "text", required: true },
          { label: "Designation", name: "designation", type: "text", required: true },
          { label: "Dept./Section/Centre", name: "department", type: "text", required: true },
          { label: "Employee Signature Name", name: "employeeSignatureName", type: "text", required: true },
          { label: "Employee Number", name: "empNo", type: "text", required: true },
          { label: "Place", name: "place", type: "text", required: true },
          { label: "Date", name: "declarationDate", type: "date", required: true },
        ],
        approvalStages: [],
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load general administration self declaration template" });
  }
};

const getSecurityCampusLeaveTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security campus leave template" });
  }
};

const getSecurityDayScholarVehiclePermitTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_CODE });
    if (!template) {
      template = await FormTemplate.create({
        ...SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_TEMPLATE,
        createdBy: req.user.id,
      });
    }
    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security day scholar vehicle permit template" });
  }
};

const getSecurityMessWorkersTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_MESS_WORKERS_CODE });
    if (!template) {
      template = await FormTemplate.create({
        ...SECURITY_MESS_WORKERS_TEMPLATE,
        createdBy: req.user.id,
      });
    }
    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security mess workers template" });
  }
};

const getSecurityPassRenewalTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_PASS_RENEWAL_CODE });
    if (!template) {
      template = await FormTemplate.create({ ...SECURITY_PASS_RENEWAL_TEMPLATE, createdBy: req.user.id });
    }
    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security pass renewal template" });
  }
};

const getSecurityEntryPassTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: SECURITY_ENTRY_PASS_CODE });
    if (!template) {
      template = await FormTemplate.create({ ...SECURITY_ENTRY_PASS_TEMPLATE, createdBy: req.user.id });
    }
    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load security entry pass template" });
  }
};

const getComputerCenterLdapAccountRequestTemplate = async (req, res) => {
  try {
    let template = await FormTemplate.findOne({ code: CC_LDAP_ACCOUNT_REQUEST_CODE });

    if (!template) {
      template = await FormTemplate.create({
        ...CC_LDAP_ACCOUNT_REQUEST_TEMPLATE,
        createdBy: req.user.id,
      });
    }

    return res.json(template);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to load computer center LDAP account request template" });
  }
};

// @desc Create new form template
const createTemplate = async (req, res) => {
  try {
    const { title, description, fields, approvalStages } = req.body;

    if (!title || !fields || fields.length === 0) {
      return res.status(400).json({ message: "Title and fields required" });
    }

    const template = await FormTemplate.create({
      title,
      description,
      fields,
      approvalStages: Array.isArray(approvalStages) ? approvalStages : [],
      createdBy: req.user.id,
    });

    res.status(201).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create template" });
  }
};

// @desc Get all templates
const getAllTemplates = async (req, res) => {
  try {
    // Ensure Gen Admin template exists
    let genAdminTemplate = await FormTemplate.findOne({ code: GEN_ADMIN_TEMPLATE_CODE });
    if (!genAdminTemplate) {
      genAdminTemplate = await FormTemplate.create({
        code: GEN_ADMIN_TEMPLATE_CODE,
        title: "General Administration Self-Declaration",
        description: "A self-declaration form for general administration purposes.",
        fields: [
          { label: "Salutation", name: "salutation", type: "select", required: true, options: ["Dr.", "Mr.", "Ms."] },
          { label: "Full Name", name: "fullName", type: "text", required: true },
          { label: "Designation", name: "designation", type: "text", required: true },
          { label: "Dept./Section/Centre", name: "department", type: "text", required: true },
          { label: "Employee Signature Name", name: "employeeSignatureName", type: "text", required: true },
          { label: "Employee Number", name: "empNo", type: "text", required: true },
          { label: "Place", name: "place", type: "text", required: true },
          { label: "Date", name: "declarationDate", type: "date", required: true },
        ],
        approvalStages: [],
        createdBy: req.user?.id || null,
      });
    }

    // Ensure Security Campus Leave (Female) template exists
    let securityCampusLeaveTemplate = await FormTemplate.findOne({ code: SECURITY_CAMPUS_LEAVE_FEMALE_CODE });
    if (!securityCampusLeaveTemplate) {
      await FormTemplate.create({ ...SECURITY_CAMPUS_LEAVE_FEMALE_TEMPLATE, createdBy: req.user?.id || null });
    }

    // Ensure Security Day Scholar Vehicle Permit template exists
    let securityDsVehicleTemplate = await FormTemplate.findOne({ code: SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_CODE });
    if (!securityDsVehicleTemplate) {
      await FormTemplate.create({ ...SECURITY_DAY_SCHOLAR_VEHICLE_PERMIT_TEMPLATE, createdBy: req.user?.id || null });
    }

    // Ensure Security Mess Workers template exists
    let securityMessWorkersTemplate = await FormTemplate.findOne({ code: SECURITY_MESS_WORKERS_CODE });
    if (!securityMessWorkersTemplate) {
      await FormTemplate.create({ ...SECURITY_MESS_WORKERS_TEMPLATE, createdBy: req.user?.id || null });
    }

    // Ensure Security Pass Renewal template exists
    let securityPassRenewalTemplate = await FormTemplate.findOne({ code: SECURITY_PASS_RENEWAL_CODE });
    if (!securityPassRenewalTemplate) {
      await FormTemplate.create({ ...SECURITY_PASS_RENEWAL_TEMPLATE, createdBy: req.user?.id || null });
    }

    // Ensure Security Entry Pass template exists
    let securityEntryPassTemplate = await FormTemplate.findOne({ code: SECURITY_ENTRY_PASS_CODE });
    if (!securityEntryPassTemplate) {
      await FormTemplate.create({ ...SECURITY_ENTRY_PASS_TEMPLATE, createdBy: req.user?.id || null });
    }

    // Ensure Computer Center LDAP account request template exists
    let ccLdapTemplate = await FormTemplate.findOne({ code: CC_LDAP_ACCOUNT_REQUEST_CODE });
    if (!ccLdapTemplate) {
      await FormTemplate.create({
        ...CC_LDAP_ACCOUNT_REQUEST_TEMPLATE,
        createdBy: req.user?.id || null,
      });
    }

    const templates = await FormTemplate.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

// @desc Get templates created by current user
const getMyTemplates = async (req, res) => {
  try {
    const templates = await FormTemplate.find({
      createdBy: req.user.id, // changed here
    }).sort({ createdAt: -1 });

    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user templates" });
  }
};

module.exports = {
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
};