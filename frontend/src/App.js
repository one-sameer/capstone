import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import BulkImport from "./pages/BulkImport";
import AdminFormBuilder from "./pages/AdminFormBuilder";
import FillForm from "./pages/FillForm";
import Forms from "./pages/Forms";
import FormFill from "./pages/FormFill";
import Submissions from "./pages/Submissions";
import Approvals from "./pages/Approvals";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bulk-import"
          element={
            <PrivateRoute>
              <BulkImport />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/form-builder"
          element={
            <PrivateRoute>
              <AdminFormBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/forms"
          element={
            <PrivateRoute>
              <Forms />
            </PrivateRoute>
          }
        />
        <Route
          path="/fill-form/:templateId"
          element={
            <PrivateRoute>
              <FillForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/forms/:templateId/fill"
          element={
            <PrivateRoute>
              <FormFill />
            </PrivateRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <PrivateRoute>
              <Submissions />
            </PrivateRoute>
          }
        />
        <Route
          path="/approvals"
          element={
            <PrivateRoute>
              <Approvals />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;