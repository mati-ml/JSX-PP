import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col } from 'react-bootstrap';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
import LanguageSwitcher from '../pages/LanguageSwitcher';
import NavbarAdmin from './navbaradmin';

function Requi() {
  const { t } = useTranslation();

  const [user_email, setUser_email] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [datosAlumno, setDatosAlumno] = useState(null);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://48.216.215.72:8000/api2/requisitos/');
        
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
      const response = await fetch('http://48.216.215.72:8000/api2/editreq/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email,
          requisitos
        }),
      });
      if (response.ok) {
        alert(t('evaluationModified'));
      } else {
        alert(t('evaluationModificationError'));
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('requestError'));
    }
  };

  return (
    <>
    <NavbarAdmin></NavbarAdmin>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm center "style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSelectStudent">
            <Form.Label>{t('selectStudentMail')}:</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelectInternshipState">
            <Form.Label>{t('internshipState')}:</Form.Label>
            <Form.Control
              as="select"
              value={requisitos}
              onChange={(e) => setRequisitos(e.target.value)}
              required
            >
              <option value="">{t('selectState')}</option>
              <option value="Aprobado">{t('approved')}</option>
              <option value="Pendiente">{t('pending')}</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {t('Subir estado')}
          </Button>
        </Form>
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
}

export default Requi;
