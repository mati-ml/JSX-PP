import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next

function AdminDashboard() {
  const { t } = useTranslation(); // Usar la función de traducción

  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));
  const isAdmin = cookies["user_role"] === "admin";

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const titleStyle = {
    backgroundColor: '#999991',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '100%'
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-100 mb-4">
        <Col xs={12}>
          <h2 style={titleStyle}>{t('adminDashboardTitle')}</h2> {/* Traduce el título del panel de administrador */}
        </Col>
      </Row>
      
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={4} lg={4} className="mb-3 d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={titleStyle}>
              {t('adminMenu')} {/* Traduce el texto del menú de administrador */}
            </Dropdown.Toggle>
            <Dropdown.Menu align="center">
              <Dropdown.Item as={Link} to="/estado-pasantia">{t('internshipStatus')}</Dropdown.Item>
              <Dropdown.Item as={Link} to="/gestion-usuarios">{t('userManagement')}</Dropdown.Item>
              <Dropdown.Item as={Link} to="/reportes">{t('reports')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} md={5} lg={8} className="mb-3 d-flex justify-content-center">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-2" style={titleStyle}>
              {t('otherOptions')} {/* Traduce el texto de otras opciones */}
            </Dropdown.Toggle>
            <Dropdown.Menu align="center">
              <Dropdown.Item as={Link} to="/configuracion">{t('settings')}</Dropdown.Item>
              <Dropdown.Item as={Link} to="/soporte">{t('support')}</Dropdown.Item>
              <Dropdown.Item as={Link} to="/acerca-de">{t('about')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
