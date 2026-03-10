import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchForms();
    fetchSubmissions();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      alert("Unauthorized");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const fetchForms = async () => {
    try {
      const res = await API.get("/forms/templates");
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await API.get("/submissions/me");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const hasSubmitted = (formId) => {
    return submissions.some((sub) => sub.template && sub.template._id === formId);
  };

  const handleDownloadPDF = async (formId, formTitle) => {
    try {
      const response = await API.get(`/submissions/pdf/${formId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${formTitle.replace(/\s+/g, "_")}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error downloading PDF. Make sure you have submitted this form.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const generatePDF = async () => {
    try {
      const response = await API.get("/auth/generate-pdf", {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "profile.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Error generating PDF");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4">Dashboard</Typography>

        {user && (
          <>
            <Typography>Name: {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
          </>
        )}

        <Box sx={{ marginTop: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" onClick={generatePDF}>
            Generate PDF
          </Button>

          {user && user.role === "Admin" && (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/admin/bulk-import")}
              >
                Bulk Import Users
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/admin/form-builder")}
              >
                Create Form
              </Button>
            </>
          )}

          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Available Forms
          </Typography>

          {forms.length === 0 ? (
            <Typography color="text.secondary">
              No forms available yet.
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
              {forms.map((form) => (
                <Grid item xs={12} sm={6} md={4} key={form._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {form.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginBottom: 1 }}
                      >
                        {form.description || "No description"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {form.fields?.length || 0} fields
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => navigate(`/fill-form/${form._id}`)}
                      >
                        {hasSubmitted(form._id) ? "Fill Again" : "Fill Form"}
                      </Button>
                      {hasSubmitted(form._id) && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => handleDownloadPDF(form._id, form.title)}
                        >
                          Download PDF
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;