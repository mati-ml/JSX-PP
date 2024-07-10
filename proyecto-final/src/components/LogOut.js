import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogOutButton = () => {
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
    <button className="btn btn-danger" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogOutButton;


