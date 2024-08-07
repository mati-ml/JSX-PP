import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavbarEst = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await fetch('http://48.216.215.72:8000/api/logout/', {
        method: 'POST',
        credentials: 'include', // Incluye las cookies en la petición
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
        navigate('/login');
      } else {
        console.error('Error en el logout');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student">
          Inicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/rubrica">
                Rubrica
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inscripcion">
                Menu de Inscripcion
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reglamento
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/proyecto">
                Proyecto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/syllabus">
                Syllabus
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/evaluaciones">
                Tus evaluaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tusevalpas">
                Evaluaciones de la empresa
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarEst;