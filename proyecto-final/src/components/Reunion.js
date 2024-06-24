import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Reunion() {
  const { t } = useTranslation();
  const [user_email, setUser_email] = useState('');
  const [reunion, setReunion] = useState('');
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/reunion/');
        
        if (response.ok) {
          const data = await response.json();
          // Verificar si la respuesta tiene la clave 'teacher_names'
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
      const response = await fetch('http://127.0.0.1:8000/api2/estado-reunion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email,
          reunion
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
        Seleccionar Mail del Alumno:
        <select
          value={user_email}
          onChange={(e) => setUser_email(e.target.value)}
          required
        >
          <option value="">Selecciona un profesor</option>
          {profesores.map((prof, index) => (
            <option key={index} value={prof}>
              {prof}
            </option>
          ))}
        </select>
      </label>
      <label>
        Estado de la Reunión:
        <select
          value={reunion}
          onChange={(e) => setReunion(e.target.value)}
          required
        >
          <option value="">Selecciona el estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Aprobado">Aprobado</option>
        </select>
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Reunion;

