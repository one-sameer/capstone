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
          path="/fill-form/:templateId"
          element={
            <PrivateRoute>
              <FillForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;