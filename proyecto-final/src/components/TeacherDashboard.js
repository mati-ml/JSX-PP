// TeacherDashboard.js
import React from "react";
import { Navigate, Link } from "react-router-dom";

function TeacherDashboard() {
    const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

    // Verifica si la cookie "user_role" existe y si su valor coincide con "student"
    const isStudent = cookies["user_role"] === "teacher";
  
    if (!isStudent) {
      return <Navigate to="/" />;
    }
  
    return (
      <div>
        <h2>Panel de Profresores</h2>
        <p>Menú para Profesores</p>
        
        {/* Agrega el enlace al menú de inscripción */}
        <Link to="/estado-reunion">Inscripción</Link>
        <Link to="/evaluar">Evaluación</Link>
      </div>
    );
}

export default TeacherDashboard;
