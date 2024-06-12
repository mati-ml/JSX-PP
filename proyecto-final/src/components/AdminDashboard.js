// AdminDashboard.js
import React from "react";
import { Navigate, Link } from "react-router-dom";

function AdminDashboard() {
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

    // Verifica si la cookie "user_role" existe y si su valor coincide con "student"
    const isStudent = cookies["user_role"] === "admin";
  
    if (!isStudent) {
      return <Navigate to="/" />;
    }
  
    return (
      <div>
        <h2>Panel de Administrador</h2>
        <p>Menú para Administrador</p>
        
        {/* Agrega el enlace al menú de inscripción */}
        <Link to="/estado-pasantia">Estado de pasantia</Link>
      </div>
    );

}

export default AdminDashboard;
