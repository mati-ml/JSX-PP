import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Inscripcion from "./components/Inscripcion-P";
import Reunion from "./components/Reunion";
import Estado from "./components/Aprobacion-Pasantia";
import Evaluaciones from "./components/Evaluación-profesores";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rubrica from "./components/vistaRubrica";
import Sylabus from "./components/Sylabus";
import Proyecto from "./components/Proyecto";
import FileDownloadComponent from "./components/NotasAl";
import Dashboard from "./components/Estadistica";
import EvaluarEmpForm from "./components/Evati";
import EvaluarEmp from "./components/Evaluación-empresea";
import RegisterAdmin from "./pages/PagRNewAdmin";
import Requi from "./components/Req";
function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUserRole(userData.user_role);
    redirectToPage(userData.user_role);
  };

  const redirectToPage = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "student":
        navigate("/student");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  const ProtectedRoute = ({ role, children }) => {
    return userRole === role ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loginadmin" element={<LoginAdmin onLoginSuccess={handleLoginSuccess} />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/inscripcion" 
        element={
          <ProtectedRoute role="student">
            <Inscripcion />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/estado-reunion" 
        element={
          <ProtectedRoute role="teacher">
            <Reunion />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/estado-pasantia" 
        element={
          <ProtectedRoute role="admin">
            <Estado />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rubrica" 
        element={
          <ProtectedRoute role="student">
            <Rubrica />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/evaluaciones" 
        element={
          <ProtectedRoute role="student">
            <FileDownloadComponent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/proyecto" 
        element={
          <ProtectedRoute role="student">
            <Proyecto />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/syllabus" 
        element={
          <ProtectedRoute role="student">
            <Sylabus />
          </ProtectedRoute>
        } 
      />
<Route 
        path="/tusevalpas" 
        element={
          <ProtectedRoute role="student">
            <EvaluarEmp />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/evaluar" 
        element={
          <ProtectedRoute role="teacher">
            <Evaluaciones/>
          </ProtectedRoute>
        } 
      />
<Route 
        path="/registrarNA" 
        element={
          <ProtectedRoute role="admin">
            <RegisterAdmin/>
          </ProtectedRoute>
        } 
      />
<Route 
        path="/requisitos" 
        element={
          <ProtectedRoute role="admin">
            <Requi />
          </ProtectedRoute>
        } 
      />
<Route 
        path="/evaluarpas" 
        element={
          
            <EvaluarEmpForm/>
        } 
      />
<Route 
        path="/estadisticas" 
        element={
          <ProtectedRoute role="admin">
            <Dashboard/>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;