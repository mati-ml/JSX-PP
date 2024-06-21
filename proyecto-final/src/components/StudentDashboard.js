import React from "react";
import { Navigate, Link } from "react-router-dom";

function StudentDashboard() {
  // Obtiene todas las cookies y las divide en un objeto
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "student"
  const isStudent = cookies["user_role"] === "student";

  // Si el usuario no es un estudiante, redirige a la página de inicio
  if (!isStudent) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Panel de Estudiante</h2>
      <p>Menú para estudiantes</p>
      
      {/* Agrega el enlace al menú de inscripción */}
      <Link to="/inscripcion">Menú de Inscripción</Link>
      <br />
      {/* Agrega el enlace al documento PDF */}
      <a href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf" target="_blank" rel="noopener noreferrer">
        Reglamento de Pasantía  versión 2023
      </a>   
      </div> 
  );
     
 
      
}

export default StudentDashboard;

