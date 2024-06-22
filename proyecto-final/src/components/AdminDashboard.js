// AdminDashboard.js
import React from "react";
import { Navigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));

  // Verifica si la cookie "user_role" existe y si su valor coincide con "admin"
  const isAdmin = cookies["user_role"] === "admin";
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Admin Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/estado-pasantia">Estado de Pasantía</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Más opciones
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/opcion1">Opción 1</Link></li>
                  <li><Link className="dropdown-item" to="/opcion2">Opción 2</Link></li>
                  <li><Link className="dropdown-item" to="/opcion3">Opción 3</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Otras opciones
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                  <li><Link className="dropdown-item" to="/opcion4">Opción 4</Link></li>
                  <li><Link className="dropdown-item" to="/opcion5">Opción 5</Link></li>
                  <li><Link className="dropdown-item" to="/opcion6">Opción 6</Link></li>
                </ul>
              </li>
              {/* Agrega más elementos del menú según sea necesario */}
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="container mt-4">
        <h2>Panel de Administrador</h2>
        <p>Menú para Administrador</p>
        
        {/* Agrega el enlace al menú de inscripción */}
        <Link to="/estado-pasantia">Estado de pasantía</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
