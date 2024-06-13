import React, { useState, useEffect } from 'react';

function Evaluaciones() {
  // Estados para almacenar los valores del formulario
  const [sup_email, setSup_email] = useState('');
  const [nombre_sup, setNombre_sup] = useState('');
  const [rut_sup, setRut_sup] = useState('');
  const [resumen, setResumen] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [evaluacion, setEvaluacion] = useState('Evaluación 1');
  const [comentarios, setComentarios] = useState('');
  const [nota, setNota] = useState('');

  // Cargar la lista de profesores al montar el componente
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/teachers/');
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.teacher_names) {
            setProfesores(data.teacher_names);
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

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el user_id de la cookie
      const user_id = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1"), 10);
      console.log(user_id);
      // Realizar la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api2/inscripcion-pasantias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          sup_email,
          nombre_sup,
          rut_sup,
          resumen,
          teacher,
          evaluacion,
          comentarios,
          nota
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
        Email Supervisor:
        <input type="email" value={sup_email} onChange={(e) => setSup_email(e.target.value)} />
      </label>
      <label>
        Nombre Supervisor:
        <input type="text" value={nombre_sup} onChange={(e) => setNombre_sup(e.target.value)} />
      </label>
      <label>
        Rut Supervisor:
        <input type="text" value={rut_sup} onChange={(e) => setRut_sup(e.target.value)} />
      </label>
      <label>
        Resumen:
        <textarea value={resumen} onChange={(e) => setResumen(e.target.value)} />
      </label>
      <label>
        Seleccionar Profesor:
        <select
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
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
        Comentarios:
        <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
      </label>
      <label>
        Nota:
        <input type="number" value={nota} onChange={(e) => setNota(e.target.value)} min="1" max="7" />
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Evaluaciones;
