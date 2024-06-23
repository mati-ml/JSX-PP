import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

function AdminDashboard() {
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "admin"
  const isAdmin = cookies["user_role"] === "admin";
  
  if (!isAdmin) {
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
          <h2 style={titleStyle}>Panel de Administrador</h2>
        </Col>
      </Row>
      
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={4} lg={4} className="mb-3 d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={titleStyle}>
              Menú de Administrador
            </Dropdown.Toggle>
            <Dropdown.Menu align="center">
              <Dropdown.Item as={Link} to="/estado-pasantia">Estado de Pasantía</Dropdown.Item>
              <Dropdown.Item as={Link} to="/gestion-usuarios">Gestión de Usuarios</Dropdown.Item>
              <Dropdown.Item as={Link} to="/reportes">Reportes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} md={5} lg={8} className="mb-3 d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-2" style={titleStyle}>
              Otras Opciones
            </Dropdown.Toggle>
            <Dropdown.Menu align="center">
              <Dropdown.Item as={Link} to="/configuracion">Configuración</Dropdown.Item>
              <Dropdown.Item as={Link} to="/soporte">Soporte</Dropdown.Item>
              <Dropdown.Item as={Link} to="/acerca-de">Acerca de</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
