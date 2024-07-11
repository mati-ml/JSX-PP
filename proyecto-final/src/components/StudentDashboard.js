import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LogOutButton from "./LogOut";
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';

function StudentDashboard() {
  const { t } = useTranslation();
  // Obtiene todas las cookies y las divide en un objeto
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "student"
  const isStudent = cookies["user_role"] === "student";

  // Si el usuario no es un estudiante, redirige a la página de inicio
  if (!isStudent) {
    return <Navigate to="/" />;
  }

  // Estilos en línea para los títulos y el contenedor

  return (
    <>
    <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="bg-white"></div>
      <div className="p-5 shadow-lg bg-white" style={{ maxWidth: '600px', zIndex: 1 }}>
        <h2 className="p-2 rounded text-center mb-4">Menu de Estudiantes</h2>

        <Row className="w-100 justify-content-center">
          <Col xs={12} md={5} lg={4} className="mb-3 d-flex justify-content-center">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Menú de Estudiante
              </Dropdown.Toggle>
              <Dropdown.Menu align="center">
                <Dropdown.Item as={Link} to="/inscripcion">Menú de Inscripción</Dropdown.Item>
                <Dropdown.Item href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf" target="_blank" rel="noopener noreferrer">
                  Reglamento de Pasantía versión 2023
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/proyecto">Inscripción de Proyecto</Dropdown.Item>
                <Dropdown.Item as={Link} to="/rubrica">Rúbrica</Dropdown.Item>
                <Dropdown.Item as={Link} to="/syllabus">Syllabus</Dropdown.Item>
                <Dropdown.Item as={Link} to="/evaluaciones">Ver Evaluaciones</Dropdown.Item>
                <Dropdown.Item as={Link} to="/tusevalpas">Ver tus Evaluaciones de la Empresa</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="w-100 justify-content-center">
          <Col xs={12} className="mb-3 d-flex justify-content-center">
            <LogOutButton />
          </Col>
        </Row>
      </div>
    </Container>
    {/* Estilo de fondo para cubrir toda la página */}
    <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
}

export default StudentDashboard;