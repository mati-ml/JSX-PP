import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next
import LogOutButton from "./LogOut";
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
import LanguageSwitcher from "../pages/LanguageSwitcher";

function AdminDashboard() {
  const { t } = useTranslation(); // Usar la función de traducción

  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));
  const isAdmin = cookies["user_role"] === "admin";

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="bg-overlay"></div>
        <div className="p-5 shadow-lg custom-opacity" style={{ maxWidth: '600px', zIndex: 1 }}>
          <h2 className=" p-2 rounded text-center mb-4">{t('adminDashboardTitle')}</h2>

          <Row className="mb-3">
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100 mb-3">
                  {t('adminMenu')}
                </Dropdown.Toggle>
                <Dropdown.Menu align="center">
                  <Dropdown.Item as={Link} to="/estado-pasantia">{t('internshipStatus')}</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/registrarNA">{t('userManagement')}</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/estadisticas">{t('stats')}</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/requisitos">{t('Requirements')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
        <LogOutButton />
      </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} className="d-flex justify-content-center">
            <LanguageSwitcher></LanguageSwitcher>
            </Col>
          </Row>
        </div>
      </Container>

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
            .custom-opacity {
    background-color: rgba(255, 255, 255); /* Fondo blanco con 75% de opacidad */
  }
        `}
      </style>
    </>
  );
}

export default AdminDashboard;