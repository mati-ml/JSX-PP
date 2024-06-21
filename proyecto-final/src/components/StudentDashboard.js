import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

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
      
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Menú de Estudiante
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/inscripcion">Menú de Inscripción</Dropdown.Item>
          <Dropdown.Item href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf" target="_blank" rel="noopener noreferrer">
            Reglamento de Pasantía versión 2023
          </Dropdown.Item>
          <Dropdown.Item>Estado de pasantía</Dropdown.Item>
          <Dropdown.Item>Notas pasantía y feedbacks</Dropdown.Item>
          <Dropdown.Item>Profesores</Dropdown.Item>
          <Dropdown.Item>Subir archivos</Dropdown.Item>
          <Dropdown.Item href="proyecto-final/Rúbrica Evaluación de Desempeño Alumno en Práctica (ED).pdf">rubrica</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
    </div>
  );
}

export default StudentDashboard;


