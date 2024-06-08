import React, { useState, useEffect } from 'react';

function Inscripcion() {
  // Estados para almacenar los valores del formulario
  const [fecha_ini, setFecha_ini] = useState('');
  const [fecha_ter, setFecha_ter] = useState('');
  const [nombre_emp, setNombre_emp] = useState('');
  const [rut_emp, setRut_emp] = useState('');
  const [sup_email, setSup_email] = useState('');
  const [nombre_sup, setNombre_sup] = useState('');
  const [rut_sup, setRut_sup] = useState('');
  const [resumen, setResumen] = useState('');
  const [profesor, setProfesor] = useState('');
  const [profesores, setProfesores] = useState([]);

  // Cargar la lista de profesores al montar el componente
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api2/teachers/');
        if (response.ok) {
          const data = await response.json();
          setProfesores(data);
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
      const user_id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1");

      // Realizar la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api2/inscripcion-pasantias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          fecha_ini,
          fecha_ter,
          nombre_emp,
          rut_emp,
          sup_email,
          nombre_sup,
          rut_sup,
          resumen,
          profesor,
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
        Fecha Inicial:
        <input type="text" value={fecha_ini} onChange={(e) => setFecha_ini(e.target.value)} />
      </label>
      <label>
        Fecha Final:
        <input type="text" value={fecha_ter} onChange={(e) => setFecha_ter(e.target.value)} />
      </label>
      <label>
        Nombre Empresa:
        <input type="text" value={nombre_emp} onChange={(e) => setNombre_emp(e.target.value)} />
      </label>
      <label>
        Rut Empresa:
        <input type="text" value={rut_emp} onChange={(e) => setRut_emp(e.target.value)} />
      </label>
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
        <select value={profesor} onChange={(e) => setProfesor(e.target.value)} required>
          <option value="">Selecciona un profesor</option>
          {profesores.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Inscripcion;
