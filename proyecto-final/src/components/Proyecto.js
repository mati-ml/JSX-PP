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

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{t('upload')}</button> {/* Traduce el texto del botón de subir */}
      </form>
      {uploadedFile && (
        <div>
          <p>{t('fileUploaded')}:</p> {/* Traduce el mensaje de archivo subido */}
          <p>{uploadedFile.filename}</p>
        </div>
      )}
    </div>
  );
};

export default Proyecto;

