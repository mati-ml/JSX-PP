import React, { useState, useEffect } from 'react';

function Estado() {
  const [user_email, setUser_email] = useState('');
  const [estado, setEstado] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [datosAlumno, setDatosAlumno] = useState(null);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/pendientes/');
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.Pendientes) {
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

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setUser_email(email);
    
    if (email) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/get-evaluation-details/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_email: email }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setDatosAlumno(data);
        } else {
          console.error('Error al obtener los datos del alumno.');
          setDatosAlumno(null);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setDatosAlumno(null);
      }
    } else {
      setDatosAlumno(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api2/estado-pasantia/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email,
          estado
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Seleccionar Mail del Alumno:
          <select
            value={user_email}
            onChange={handleEmailChange}
            required
          >
            <option value="">Selecciona un alumno</option>
            {profesores.map((prof, index) => (
              <option key={index} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado de la Pasantia:
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">Selecciona el estado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </label>
        <button type="submit">Modificar Evaluación</button>
      </form>

      {datosAlumno && (
        <div>
          <h3>Datos del Alumno</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(datosAlumno).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(datosAlumno).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Estado;