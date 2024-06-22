import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function TeacherDashboard() {
    const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

    // Verifica si la cookie "user_role" existe y si su valor coincide con "teacher"
    const isTeacher = cookies["user_role"] === "teacher";
  
    if (!isTeacher) {
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
        <h2 style={titleStyle}>Panel de Profesores</h2>
        <p>Menú para Profesores</p>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" style={titleStyle}>
            Menú de Profesor
          </Dropdown.Toggle>
          <Dropdown.Menu align="center">
            <Dropdown.Item as={Link} to="/estado-reunion">Inscripción</Dropdown.Item>
            <Dropdown.Item as={Link} to="/evaluar">Evaluación</Dropdown.Item>
            <Dropdown.Item as={Link} to="/reunion">Reuniones</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>
    );
}

export default TeacherDashboard;
