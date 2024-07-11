import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LogOutButton from "./LogOut";
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';

function TeacherDashboard() {
  const { t } = useTranslation();
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "teacher"
  const isTeacher = cookies["user_role"] === "teacher";
  
  if (!isTeacher) {
    return <Navigate to="/" />;
  }

  // Estilos en línea para los títulos y el contenedor


  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" >
        <div className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
          <Row className="w-100 mb-4">
            <Col xs={12}>
              <h2 className="text-center">Panel de Profesores</h2>
            </Col>
          </Row>
          
          <Row className="w-100 justify-content-center">
            <Col xs={12} md={5} lg={4} className="mb-3 d-flex justify-content-center">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Menú de Profesor
                </Dropdown.Toggle>
                <Dropdown.Menu align="center">
                  <Dropdown.Item as={Link} to="/cerrar">Cerrar Curso</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/evaluar">Evaluación</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/estado-reunion">Reuniones</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <div className="text-center">
            <LogOutButton />
          </div>
        </div>
      </div>
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
};

export default TeacherDashboard;
