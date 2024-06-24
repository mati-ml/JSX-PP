import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Evaluaciones() {
  const { t } = useTranslation();
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [evaluacion, setEvaluacion] = useState('Evaluación 1');
  const [file, setFile] = useState(null);
  const [nota, setNota] = useState(''); // Nuevo estado para "nota"
  const [comentario, setComentario] = useState(''); // Nuevo estado para "comentario"

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
        const response = await fetch('http://localhost:8000/api2/alumnos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "user_email": user_email }),
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
    formData.append('nota', nota); // Añadir "nota" al FormData
    formData.append('comentario', comentario); // Añadir "comentario" al FormData

    try {
      const response = await fetch('http://localhost:8000/api2/evaluacion/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert(t('evaluationModifiedSuccessfully')); // Traduce el mensaje de éxito
        setSelectedAlumno('');
        setEvaluacion('Evaluación 1');
        setFile(null);
        setNota(''); // Resetear el campo "nota"
        setComentario(''); // Resetear el campo "comentario"
      } else {
        alert(t('errorModifyingEvaluation')); // Traduce el mensaje de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('errorSendingRequest')); // Traduce el mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
      <label>
        {t('selectStudent')} {/* Traduce el texto de selección de alumno */}
        <select
          value={selectedAlumno}
          onChange={(e) => setSelectedAlumno(e.target.value)}
          required
        >
          <option value="">{t('selectStudentPlaceholder')}</option> {/* Traduce el texto de selección de alumno */}
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t('evaluationName')} {/* Traduce el texto de nombre de la evaluación */}
        <select
          value={evaluacion}
          onChange={(e) => setEvaluacion(e.target.value)}
          required
        >
          <option value="Evaluación 1">{t('evaluation1')}</option> {/* Traduce el nombre de la evaluación */}
          <option value="Evaluación 2">{t('evaluation2')}</option> {/* Traduce el nombre de la evaluación */}
          <option value="Evaluación 3">{t('evaluation3')}</option> {/* Traduce el nombre de la evaluación */}
        </select>
      </label>
      <label>
        {t('uploadFile')} {/* Traduce el texto de subir archivo */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <label>
        {t('grade')} {/* Traduce el texto de "nota" */}
        <input
          type="number"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
      </label>
      <label>
        {t('comment')} {/* Traduce el texto de "comentario" */}
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </label>
      <button type="submit">{t('modifyEvaluation')}</button> {/* Traduce el texto de modificar evaluación */}
    </form>
  );
}

export default Evaluaciones;

