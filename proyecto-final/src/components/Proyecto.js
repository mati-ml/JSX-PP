/*
import React, { useState, useEffect } from 'react';

function Proyecto() {
  // Estados para almacenar los valores del formulario
  const [resumen, setResumen] = useState('');
  // Cargar la lista de profesores al montar el componente

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el user_id de la cookie
      const user_id = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1"), 10);
      console.log(user_id);
      // Realizar la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api2/proyecto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          resumen
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
    <form onSubmit={handleSubmit}>
      <label>
        Haga una descripcion de su proyecto en 1000 palabras
        <input type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} />
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Proyecto;
*/
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarEst from './navbarest';
import { Container, Form, Button } from 'react-bootstrap';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';

const Proyecto = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userId, setUserId] = useState(''); // Estado para almacenar user_id

  useEffect(() => {
    const fetchUserIdFromCookie = () => {
      const cookies = document.cookie.split(';');
      let foundUserId = '';
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'user_id') {
          foundUserId = decodeURIComponent(value);
        }
      });
      setUserId(foundUserId);
    };

    fetchUserIdFromCookie();
  }, []); // Ejecutar una sola vez al montar el componente

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('user_id', userId); // Añade user_id al FormData

    try {
      const response = await fetch('http://48.216.215.72:8000/api2/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      const data = await response.json();
      setUploadedFile(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return(
    <>
  <NavbarEst />

  <div className="d-flex align-items-center justify-content-center min-vh-100">
    <Container className="p-4 shadow-lg rounded bg-white" style={{ maxWidth: '400px' }}>
      <Form onSubmit={handleSubmit} className="text-center">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>{t('selectFile')}</Form.Label> {/* Traduce el texto de selección de archivo */}
          <Form.Control
            type="file"
            onChange={handleFileChange}
            size="m" // Tamaño pequeño
            style={{ width: '100%' }} // Ancho al 100% dentro del formulario
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t('upload')}
        </Button> {/* Traduce el texto del botón de subir */}
      </Form>

      {uploadedFile && (
        <div className="mt-3">
          <p>{t('fileUploaded')}:</p> {/* Traduce el mensaje de archivo subido */}
          <p>{uploadedFile.name}</p>
        </div>
      )}
    </Container>
  </div>
  {/* Estilo de fondo para cubrir toda la página */}
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

export default Proyecto;

