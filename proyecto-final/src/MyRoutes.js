// Routes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

const MyRoutes = ({ userRole, checkUserRole }) => {
  const handleLogin = () => {
    checkUserRole();
    if (userRole) {
      switch (userRole) {
        case "admin":
          return <Navigate to="/admin" />;
        case "student":
          return <Navigate to="/student" />;
        case "teacher":
          return <Navigate to="/teacher" />;
        default:
          return <Navigate to="/login" />;
      }
    }
    return <Login onLogin={checkUserRole} />;
  };

  const PrivateRoute = ({ element, role }) => {
    return userRole === role ? element : <Navigate to="/login" />;
  };

  const AdminPage = () => <AdminDashboard />;
  const StudentPage = () => <StudentDashboard />;
  const TeacherPage = () => <TeacherDashboard />;

  return (
    <Routes>
      <Route path="/login" element={handleLogin} />
      <Route path="/admin" element={<PrivateRoute role="admin" element={<AdminPage />} />} />
      <Route path="/student" element={<PrivateRoute role="student" element={<StudentPage />} />} />
      <Route path="/teacher" element={<PrivateRoute role="teacher" element={<TeacherPage />} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default MyRoutes;
