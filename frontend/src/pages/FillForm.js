import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const FillForm = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      const res = await API.get(`/forms/templates`);
      const foundTemplate = res.data.find((t) => t._id === templateId);
      if (foundTemplate) {
        setTemplate(foundTemplate);
        // Initialize form data with empty values (only for non-paperOnly fields)
        const initialData = {};
        foundTemplate.fields.forEach((field) => {
          if (!field.paperOnly) {
            initialData[field.name] = "";
          }
        });
        setFormData(initialData);
      }
    } catch (err) {
      alert("Error loading form template");
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields (only non-paperOnly fields)
      if (template) {
        for (const field of template.fields) {
          if (!field.paperOnly && field.required && !formData[field.name]) {
            alert(`${field.label} is required`);
            return;
          }
        }
      }

      // Submit the form
      await API.post("/submissions", {
        templateId: templateId,
        responses: formData,
      });

      alert("Form submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    }
  };

  if (!template) {
    return (
      <Container>
        <Box sx={{ marginTop: 5 }}>
          <Typography>Loading form...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {template.title}
        </Typography>
        
        {template.description && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {template.description}
          </Typography>
        )}

        <Paper sx={{ padding: 3, marginTop: 3 }}>
          {template.fields.filter(field => !field.paperOnly).map((field, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              {field.type === "textarea" ? (
                <TextField
                  fullWidth
                  label={field.label}
                  multiline
                  rows={4}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <FormControl fullWidth required={field.required}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={formData[field.name] || ""}
                    label={field.label}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  >
                    {field.options.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : undefined
                  }
                />
              )}
            </Box>
          ))}
        </Paper>

        <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Form
          </Button>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FillForm;
