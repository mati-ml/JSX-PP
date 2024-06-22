import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function AdminDashboard() {
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "admin"
  const isAdmin = cookies["user_role"] === "admin";
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <div>
      <h2>Panel de Administrador</h2>
      <p>Menú para Administrador</p>
      
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Menú de Administrador
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/estado-pasantia">Estado de Pasantía</Dropdown.Item>
          <Dropdown.Item as={Link} to="/gestion-usuarios">Gestión de Usuarios</Dropdown.Item>
          <Dropdown.Item as={Link} to="/reportes">Reportes</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="mt-3">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic-2">
          Otras Opciones
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/configuracion">Configuración</Dropdown.Item>
          <Dropdown.Item as={Link} to="/soporte">Soporte</Dropdown.Item>
          <Dropdown.Item as={Link} to="/acerca-de">Acerca de</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
    </div>
  );
}

export default AdminDashboard;
