import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarEst from './navbarest';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';

const EvaluarEmp = () => {
  const [personas, setPersonas] = useState(null);
  const [notapemp, setNotapemp] = useState(null);

  useEffect(() => {
    const userEmail = getCookie('user_email');
    if (userEmail) {
      fetch('http://48.216.215.72:8000/api2/obevalpas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: userEmail }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.personas !== undefined && data.notapemp !== undefined) {
          setPersonas(data.personas);
          setNotapemp(data.notapemp);
          console.log(personas);
          console.log(notapemp)
        }
      })
      .catch(error => {
        console.error('Error al obtener la evaluación:', error);
      });
    }
  }, []);


  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '20px',
    display: 'inline-block',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  
return(<>
      <NavbarEst />
      
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-white p-4 rounded shadow-sm text-center">
          <h2 className="mb-3">Evaluaciones de la empresa</h2>
          <Link
            to="/evaluarpas"
            className="d-block text-decoration-none mb-3"
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Mande el link Adjunto a los trabajadores
          </Link>
          {personas < 3 ? (
            <p className="mb-3">Menos de 3 personas han evaluado.</p>
          ) : (
            personas !== null && (
              <div className="text-center">
                <p className="mb-1">Personas: {personas}</p>
                <p className="mb-1">Nota Promedio: {notapemp}</p>
              </div>
            )
          )}
        </div>
      </div>
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


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default EvaluarEmp;
