import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EvaluarEmp = () => {
  const [personas, setPersonas] = useState(null);
  const [notapemp, setNotapemp] = useState(null);

  useEffect(() => {
    const userEmail = getCookie('user_email');
    if (userEmail) {
      fetch('http://localhost:8000/api2/obevalpas/', {
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
        }
      })
      .catch(error => {
        console.error('Error al obtener la evaluación:', error);
      });
    }
  }, []);

  const containerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
  };

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

  return (
    <div style={containerStyle}>
      {personas >= 3 ? (
        <Link
          to="/evaluarpas"
          style={linkStyle}
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
        >
          Mande el link Adjunto a los trabajadores
        </Link>
      ) : (
        <p>Menos de 3 personas han evaluado.</p>
      )}
      {personas !== null && (
        <div>
          <p>Personas: {personas}</p>
          <p>Nota Promedio: {notapemp}</p>
        </div>
      )}
    </div>
  );
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default EvaluarEmp;
