import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"

const LogOutButton = () => {
  const handleLogOut = async () => {
    const navigate = useNavigate();
    try {
      const response = await fetch('https://48.216.215.72:8000/api/logout/', {
        method: 'POST',
        credentials: 'include', // Incluye las cookies en la petición
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Eliminar las cookies
        Cookies.remove('user_id');
        Cookies.remove('user_email');
        Cookies.remove('csrftoken')

        // Opcionalmente, redirigir al usuario a la página de inicio de sesión
        navigate("/login");
      } else {
        console.error('Error en el logout');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return <button onClick={handleLogOut}>Log Out</button>;
};

export default LogOutButton;
