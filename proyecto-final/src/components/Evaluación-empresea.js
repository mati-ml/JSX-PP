import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Evaluacionesempresa() {
  const { t } = useTranslation();
  // Estados para almacenar los valores del formulario
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [evaluacion, setEvaluacion] = useState('Evaluación 1');
  const [comentarios, setComentarios] = useState('');
  const [nota, setNota] = useState('');

  // Cargar la lista de alumnos al montar el componente
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos/');
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.alumnos) {
            setAlumnos(data.alumnos);
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

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api2/inscripcion-pasantias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alumno_id: selectedAlumno,
          evaluacion,
          comentarios,
          nota
        }),
      });
      if (response.ok) {
        alert(t('evaluationModifiedSuccessfully')); // Traduce el mensaje de éxito
        // Limpiar los campos del formulario después de enviar
        setSelectedAlumno('');
        setEvaluacion('Evaluación 1');
        setComentarios('');
        setNota('');
      } else {
        alert(t('errorModifyingEvaluation')); // Traduce el mensaje de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('errorSendingRequest')); // Traduce el mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {t('comments')} {/* Traduce el texto de comentarios */}
        <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
      </label>
      <label>
        {t('grade')} {/* Traduce el texto de nota */}
        <input type="number" value={nota} onChange={(e) => setNota(e.target.value)} min="1" max="7" />
      </label>
      <button type="submit">{t('modifyEvaluation')}</button> {/* Traduce el texto de modificar evaluación */}
    </form>
  );
}

export default Evaluacionesempresa;
