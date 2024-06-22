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

  // Estilos en línea para los títulos y el contenedor
  const titleStyle = {
    backgroundColor: '#999991', // Cambia esto al color de fondo que desees
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Panel de Estudiante</h2>
      
      
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={titleStyle}>
          Menú de Estudiante
        </Dropdown.Toggle>

        <Dropdown.Menu align="center">
          <Dropdown.Item as={Link} to="/inscripcion">Menú de Inscripción</Dropdown.Item>
          <Dropdown.Item href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf" target="_blank" rel="noopener noreferrer">
            Reglamento de Pasantía versión 2023
          </Dropdown.Item>
          <Dropdown.Item>Estado de pasantía</Dropdown.Item>
          <Dropdown.Item>Notas pasantía y feedbacks</Dropdown.Item>
          <Dropdown.Item>Profesores</Dropdown.Item>
          <Dropdown.Item>Subir archivos</Dropdown.Item>
          <Dropdown.Item as={Link} to="/rubrica">rubrica</Dropdown.Item>
          <Dropdown.Item as={Link} to="/syllabus">Syllabus</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default StudentDashboard;
