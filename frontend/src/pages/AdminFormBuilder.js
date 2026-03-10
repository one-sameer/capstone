import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminFormBuilder = () => {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState([
    {
      label: "",
      name: "",
      type: "text",
      required: false,
      options: [],
      paperOnly: false,
    },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        label: "",
        name: "",
        type: "text",
        required: false,
        options: [],
        paperOnly: false,
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    
    // Auto-generate name from label if name is empty
    if (key === "label" && !newFields[index].name) {
      newFields[index].name = value.toLowerCase().replace(/\s+/g, "_");
    }
    
    setFields(newFields);
  };

  const handleOptionsChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].options = value.split(",").map((opt) => opt.trim());
    setFields(newFields);
  };

  const handleSubmit = async () => {
    try {
      if (!formTitle) {
        alert("Please enter a form title");
        return;
      }

      const validFields = fields.filter((field) => field.label && field.name);

      if (validFields.length === 0) {
        alert("Please add at least one field with label and name");
        return;
      }

      await API.post("/forms/templates", {
        title: formTitle,
        description: formDescription,
        fields: validFields,
      });

      alert("Form template created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create form template");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Form Template
        </Typography>

        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <TextField
            fullWidth
            label="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            multiline
            rows={2}
            sx={{ marginBottom: 3 }}
          />

          <Typography variant="h6" gutterBottom>
            Form Fields
          </Typography>

          {fields.map((field, index) => (
            <Paper
              key={index}
              sx={{ padding: 2, marginBottom: 2, backgroundColor: "#f5f5f5" }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  label="Field Label"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  sx={{ flex: 1, minWidth: 200 }}
                />

                <TextField
                  label="Field Name"
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  sx={{ flex: 1, minWidth: 200 }}
                />

                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={field.type}
                    label="Type"
                    onChange={(e) =>
                      handleFieldChange(index, "type", e.target.value)
                    }
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="textarea">Textarea</MenuItem>
                    <MenuItem value="select">Select</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.required}
                      onChange={(e) =>
                        handleFieldChange(index, "required", e.target.checked)
                      }
                    />
                  }
                  label="Required"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.paperOnly}
                      onChange={(e) =>
                        handleFieldChange(index, "paperOnly", e.target.checked)
                      }
                    />
                  }
                  label="Fill on Paper Only"
                />

                <Button
                  color="error"
                  onClick={() => handleRemoveField(index)}
                  disabled={fields.length === 1}
                  size="small"
                >
                  Remove
                </Button>
              </Box>

              {field.type === "select" && (
                <TextField
                  fullWidth
                  label="Options (comma-separated)"
                  value={field.options.join(", ")}
                  onChange={(e) => handleOptionsChange(index, e.target.value)}
                  sx={{ marginTop: 2 }}
                  placeholder="Option 1, Option 2, Option 3"
                />
              )}
            </Paper>
          ))}

          <Button
            variant="outlined"
            onClick={handleAddField}
            sx={{ marginTop: 2 }}
          >
            + Add Field
          </Button>
        </Paper>

        <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Create Form Template
          </Button>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminFormBuilder;
