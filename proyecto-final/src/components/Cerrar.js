import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import NavbarTec from './NavbarTec';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
function Cerrar() {
  const { t } = useTranslation();
  const [user_email, setUser_email] = useState('');
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        // Leer la cookie 'user_email'
        const cookies = document.cookie.split(';');
        let userEmail = '';
        cookies.forEach(cookie => {
          const [name, value] = cookie.trim().split('=');
          if (name === 'user_email') {
            userEmail = decodeURIComponent(value);
          }
        });

        // Configurar la solicitud con la cookie 'user_email'
        const response = await fetch('http://48.216.215.72:8000/api2/alcerrar/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Incluir cookies en la solicitud
          body: JSON.stringify({ user_email: userEmail }),  // Enviar el valor de la cookie 'user_email'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Verificar si la respuesta tiene la clave 'Pendientes'
          if (data && data.Pendientes) {
            // Actualizar el estado con los nombres de los profesores obtenidos
            setProfesores(data.Pendientes);
          } else {
            console.error('Error: La respuesta de la API no tiene el formato esperado.');
          }
        } else {
          console.error('Error al obtener la lista de profesores.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
  
    fetchProfesores();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la solicitud POST a la API
      const response = await fetch('http://48.216.215.72:8000/api2/cerrar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email,
          estado: 'Cerrado'
        }),
      });
      if (response.ok) {
        alert('Evaluación modificada correctamente.');
      } else {
        alert('Error al modificar la evaluación.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud.');
    }
  };

  return (
    <>
      <NavbarTec /> {/* Asumiendo que Navbartec es tu componente de Navbar */}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
          <Form.Group controlId="userEmail">
            <Form.Label>Seleccionar Mail del Alumno:</Form.Label>
            <Form.Control as="select" className="mb-3" value={user_email} onChange={(e) => setUser_email(e.target.value)} required>
              <option value="">Selecciona un Alumno</option>
              {profesores.map((prof, index) => (
                <option key={index} value={prof}>
                  {prof}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" className="px-5 py-3" type="submit">
            Cerrar Curso
          </Button>
        </Form>
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

export default Cerrar;
