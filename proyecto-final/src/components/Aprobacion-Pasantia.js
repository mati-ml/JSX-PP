import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next

function Estado() {
  const { t } = useTranslation(); // Usar la función de traducción

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
        alert(t('evaluationModified')); // Traduce el mensaje de alerta
        fetch('http://127.0.0.1:8000/api2/formulario/'+user_email+'/')
      } else {
        alert(t('evaluationModificationError')); // Traduce el mensaje de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('requestError')); // Traduce el mensaje de error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          {t('selectStudentMail')}: {/* Traduce el texto de selección de email del alumno */}
          <select
            value={user_email}
            onChange={handleEmailChange}
            required
          >
            <option value="">{t('selectStudent')}</option>{/* Traduce el texto de selección de estudiante */}
            {profesores.map((prof, index) => (
              <option key={index} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t('internshipState')}: {/* Traduce el texto de estado de pasantía */}
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">{t('selectState')}</option>{/* Traduce el texto de selección de estado */}
            <option value="Rechazado">{t('rejected')}</option>
            <option value="Aprobado">{t('approved')}</option>
            <option value="Pendiente">{t('pending')}</option>
          </select>
        </label>
        <button type="submit">{t('modifyEvaluation')}</button>{/* Traduce el texto de modificar evaluación */}
      </form>

      {datosAlumno && (
        <div>
          <h3>{t('studentData')}</h3> {/* Traduce el título de datos del alumno */}
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
