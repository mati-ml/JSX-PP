import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation desde react-i18next
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
import NavbarAdmin from './navbaradmin';
function Estado() {
  const { t } = useTranslation(); // Usar la función de traducción

  const [user_email, setUser_email] = useState('');
  const [estado, setEstado] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [datosAlumno, setDatosAlumno] = useState(null);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://48.216.215.72:8000/api2/pendientes/');
        
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
        const response = await fetch('http://48.216.215.72:8000/api2/get-evaluation-details/', {
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
      const response = await fetch('http://48.216.215.72:8000/api2/estado-pasantia/',  {
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
        fetch(`http://48.216.215.72:8000/api2/formulario/${user_email}/`)
      } else {
        alert(t('evaluationModificationError')); // Traduce el mensaje de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('requestError')); // Traduce el mensaje de error
    }
  };

  return (<>
  <NavbarAdmin></NavbarAdmin>
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h2>Aprobacion de Pasantia</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t('selectStudentMail')}:</label>
            <select
              className="form-select"
              value={user_email}
              onChange={handleEmailChange}
              required
            >
              <option value="">{t('selectStudent')}</option>
              {profesores.map((prof, index) => (
                <option key={index} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">{t('internshipState')}:</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">{t('selectState')}</option>
              <option value="Rechazado">{t('rejected')}</option>
              <option value="Aprobado">{t('approved')}</option>
              <option value="Pendiente">{t('pending')}</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            {t('modifyEvaluation')}
          </button>
        </form>

        {datosAlumno && (
          <div className="mt-4">
            <h3 className="card-title">{t('studentData')}</h3>
            <div className="card">
              <table className="table table-bordered">
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
          </div>
        )}
      </div>
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


export default Estado;
