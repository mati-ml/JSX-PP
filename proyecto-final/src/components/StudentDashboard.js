// StudentDashboard.js
import React from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div>
      <h2>Panel de Estudiante</h2>
      <p>Menú para estudiantes</p>
      <ul>
        <li>
          <Link to="/dashboard/student/profile">Perfil</Link>
        </li>
        <li>
          <Link to="/dashboard/student/courses">Cursos</Link>
        </li>
      </ul>
    </div>
  );
}

export default StudentDashboard;
