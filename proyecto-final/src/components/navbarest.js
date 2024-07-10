import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NavbarEst = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
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
        // Redirigir al usuario a la página de inicio de sesión
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
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
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
            <li className="nav-item" href="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf">
            <Link className="nav-link" to="https://alumnosfic.uai.cl/static/media/Reglamentopasantia2023.03a7175a58d5eebf27ea.pdf" target="_blank" rel="noopener noreferrer">
                Reglamento
              </Link>
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
              <Link className="nav-link" to="/syllabus">
                Syllabus
              </Link>
            </li>
            <li>
            <button className="btn btn-" onClick={handleLogOut}>
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