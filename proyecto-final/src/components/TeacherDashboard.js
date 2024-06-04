// TeacherDashboard.js
import React from "react";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  return (
    <div>
      <h2>Panel de Profesor</h2>
      <p>Menú para profesores</p>
      <ul>
        <li>
          <Link to="/dashboard/teacher/classes">Clases</Link>
        </li>
        <li>
          <Link to="/dashboard/teacher/students">Estudiantes</Link>
        </li>
      </ul>
    </div>
  );
}

export default TeacherDashboard;
