import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Evaluaciones() {
  const { t } = useTranslation();
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [evaluacion, setEvaluacion] = useState('Evaluación 1');
  const [file, setFile] = useState(null);

  const getUserEmailCookie = () => {
    const name = 'user_email=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookie = decodedCookie.split('; ').find(cookie => cookie.startsWith(name));
    return cookie ? cookie.substring(name.length, cookie.length) : '';
  };

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const user_email = getUserEmailCookie();
        const response = await fetch('http://127.0.0.1:8000/api2/alumnos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "user_teacher": user_email }),
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.user_emails) {
            const formattedAlumnos = data.user_emails.map((email, index) => ({
              id: email,  // Usar el correo electrónico como ID del alumno
              nombre: email
            }));
            setAlumnos(formattedAlumnos);
          } else {
            console.error('Error: La respuesta de la API no tiene el formato esperado.');
          }
        } else {
          console.error('Error al obtener la lista de alumnos.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchAlumnos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('user_email', selectedAlumno);
    formData.append('evaluacion', evaluacion);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api2/evaluacion/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Evaluación modificada correctamente.');
        setSelectedAlumno('');
        setEvaluacion('Evaluación 1');
        setFile(null);
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
        Seleccionar Alumno:
        <select
          value={selectedAlumno}
          onChange={(e) => setSelectedAlumno(e.target.value)}
          required
        >
          <option value="">Selecciona un alumno</option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nombre de la Evaluación:
        <select
          value={evaluacion}
          onChange={(e) => setEvaluacion(e.target.value)}
          required
        >
          <option value="Evaluación 1">Evaluación 1</option>
          <option value="Evaluación 2">Evaluación 2</option>
          <option value="Evaluación 3">Evaluación 3</option>
        </select>
      </label>
      <label>
        Subir Archivo:
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Evaluaciones;
