// App.js
/*
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Función para verificar si el usuario está autenticado y obtener su rol
  useEffect(() => {
    const userRoleCookie = getCookie("user_role");
    setIsLoggedIn(userRoleCookie !== "");
    setUserRole(userRoleCookie);
  }, []);

  // Función para obtener el valor de una cookie por su nombre
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
        {isLoggedIn ? (
          <>
            {userRole === "student" && (
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            )}
            {userRole === "teacher" && (
              <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            )}
            {userRole === "admin" && (
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            )}
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </Routes>
    </Router>
  );
}

export default App;
*/
// App.js
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/student" component={StudentDashboard} />
      <Route path="/teacher" component={TeacherDashboard} />
    </Router>
  );
}

export default App;

