const FormSubmission = require("../models/FormSubmission");
const FormTemplate = require("../models/FormTemplate");
const PDFDocument = require("pdfkit");

// @desc Submit a form
const submitForm = async (req, res) => {
  try {
    const { templateId, responses } = req.body;

    if (!templateId || !responses) {
      return res.status(400).json({ message: "Template and responses required" });
    }

    // Ensure template exists
    const template = await FormTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    
    const submission = await FormSubmission.create({
      template: templateId,
      submittedBy: req.user.id,
      responses: responses,
      status: "submitted",
    });
    console.log("here");

    res.status(201).json(submission);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Failed to submit form" });
  }
};

// @desc Get my submissions
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await FormSubmission.find({
      submittedBy: req.user.id,
    })
      .populate("template", "title description")
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

// @desc Generate PDF for a submission
const generateSubmissionPDF = async (req, res) => {
  try {
    const { templateId } = req.params;

    // Find the submission
    const submission = await FormSubmission.findOne({
      template: templateId,
      submittedBy: req.user.id,
    })
      .populate("template")
      .populate("submittedBy", "name email");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const template = submission.template;
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${template.title.replace(/\s+/g, "_")}.pdf`
    );

    doc.pipe(res);

    const pageWidth = doc.page.width - 80;
    let yPos = doc.y;

    // Title Box
    doc.fontSize(16).font("Helvetica-Bold");
    const titleHeight = 50;
    doc.rect(40, yPos, pageWidth, titleHeight).stroke();
    doc.text(template.title, 50, yPos + 15, {
      width: pageWidth - 20,
      align: "center",
    });
    yPos += titleHeight + 10;
    doc.y = yPos;

    // Description Box (if exists)
    if (template.description) {
      doc.fontSize(10).font("Helvetica-Oblique");
      const descHeight = 40;
      doc.rect(40, yPos, pageWidth, descHeight).stroke();
      doc.text(template.description, 50, yPos + 10, {
        width: pageWidth - 20,
        align: "center",
      });
      yPos += descHeight + 10;
      doc.y = yPos;
    }

    // Add date box in top right
    const dateBoxWidth = 150;
    const dateBoxHeight = 30;
    const dateBoxX = doc.page.width - 40 - dateBoxWidth;
    doc.fontSize(10).font("Helvetica");
    doc.rect(dateBoxX, yPos, dateBoxWidth, dateBoxHeight).stroke();
    doc.text("Date:", dateBoxX + 5, yPos + 8);
    doc.text(new Date(submission.createdAt).toLocaleDateString(), dateBoxX + 45, yPos + 8);
    
    yPos += dateBoxHeight + 15;
    doc.y = yPos;

    // Form Fields - Each in its own box
    template.fields.forEach((field, index) => {
      const response = submission.responses.get(field.name) || "";
      
      // Check if we need a new page
      if (yPos > doc.page.height - 120) {
        doc.addPage();
        yPos = 40;
      }

      // Field box
      const boxHeight = field.type === "textarea" ? 80 : 40;
      doc.rect(40, yPos, pageWidth, boxHeight).stroke();

      // Label
      doc.fontSize(10).font("Helvetica-Bold");
      doc.text(field.label, 50, yPos + 8, { continued: false });

      // Response (will be empty for paperOnly fields since user didn't fill them)
      if (response) {
        doc.fontSize(10).font("Helvetica");
        const responseY = field.type === "textarea" ? yPos + 28 : yPos + 22;
        doc.text(response, 50, responseY, {
          width: pageWidth - 20,
        });
      }

      yPos += boxHeight + 5;
      doc.y = yPos;
    });

    // Footer note
    yPos += 20;
    doc.fontSize(8).font("Helvetica");
    doc.text(
      `Generated on ${new Date().toLocaleString()}`,
      40,
      yPos,
      { align: "center", width: pageWidth }
    );

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

module.exports = {
  submitForm,
  getMySubmissions,
  generateSubmissionPDF,
};