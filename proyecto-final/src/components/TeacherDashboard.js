import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LogOutButton from "./LogOut";

function TeacherDashboard() {
  const { t } = useTranslation();
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
    textAlign: 'center',
    width: '100%'
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-100 mb-4">
        <Col xs={12}>
          <h2 style={titleStyle}>Panel de Profesores</h2>
        </Col>
      </Row>
      
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={5} lg={4} className="mb-3 d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={titleStyle}>
              Menú de Profesor
            </Dropdown.Toggle>
            <Dropdown.Menu align="center">
              <Dropdown.Item as={Link} to="/cerrar">Inscripción</Dropdown.Item>
              <Dropdown.Item as={Link} to="/evaluar">Evaluación</Dropdown.Item>
              <Dropdown.Item as={Link} to="/estado-reunion">Reuniones</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div>
      <LogOutButton />
    </div>
    </Container>
    
  );
}

export default TeacherDashboard;
