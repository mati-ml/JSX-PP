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
  
    return (
      <div>
        <h2>Panel de Profesores</h2>
        <p>Menú para Profesores</p>
        
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Menú de Profesor
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/estado-reunion">Inscripción</Dropdown.Item>
            <Dropdown.Item as={Link} to="/evaluar">Evaluación</Dropdown.Item>
            <Dropdown.Item as={Link} to="/reunion">Reuniones</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>
    );
}

export default TeacherDashboard;
