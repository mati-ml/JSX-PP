import React, { useState, useEffect } from 'react';

const FileDownloadComponent = () => {
  const [user_id, setUserId] = useState('');
  const [notas1, setNotas1] = useState({ evaluacion: '', nota: '' });
  const [notas2, setNotas2] = useState({ evaluacion: '', nota: '' });
  const [notas3, setNotas3] = useState({ evaluacion: '', nota: '' });
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userIdFromCookie = getCookie('user_id');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchNotas();
    } else {
      console.error('User ID cookie not found');
      setError1('User ID cookie not found');
      setError2('User ID cookie not found');
      setError3('User ID cookie not found');
    }
  }, []);

  const fetchNotas = async () => {
    try {
      const response1 = await fetch(`http://localhost:8000/api2/eval1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });
      if (!response1.ok) {
        throw new Error(`Error al obtener evaluación 1: ${response1.statusText}`);
      }
      const data1 = await response1.json();
      setNotas1({ evaluacion: data1.evaluacion1, nota: data1.nota1 });
    } catch (error) {
      console.error('Error al obtener la evaluación 1:', error);
      setError1(`Error al obtener la evaluación 1: ${error.message}`);
    }

    try {
      const response2 = await fetch(`http://localhost:8000/api2/eval2/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });
      if (!response2.ok) {
        throw new Error(`Error al obtener evaluación 2: ${response2.statusText}`);
      }
      const data2 = await response2.json();
      setNotas2({ evaluacion: data2.evaluacion2, nota: data2.nota2 });
    } catch (error) {
      console.error('Error al obtener la evaluación 2:', error);
      setError2(`Error al obtener la evaluación 2: ${error.message}`);
    }

    try {
      const response3 = await fetch(`http://localhost:8000/api2/eval3/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });
      if (!response3.ok) {
        throw new Error(`Error al obtener evaluación 3: ${response3.statusText}`);
      }
      const data3 = await response3.json();
      setNotas3({ evaluacion: data3.evaluacion3, nota: data3.nota3 });
    } catch (error) {
      console.error('Error al obtener la evaluación 3:', error);
      setError3(`Error al obtener la evaluación 3: ${error.message}`);
    }
  };

  const downloadFile = async (endpoint, fileName) => {
    try {
      const response = await fetch(`http://localhost:8000/api2/${endpoint}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        throw new Error(`Error al descargar el archivo desde ${endpoint}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error al descargar el archivo desde ${endpoint}:`, error);
      // Aquí podrías manejar el error de descarga si lo necesitas
    }
  };

  return (
    <div>
      <div>
        <h3>Evaluación 1:</h3>
        <p>Evaluación: {notas1.evaluacion}</p>
        <p>Nota: {notas1.nota}</p>
        <button onClick={() => downloadFile('rubrica1', 'Rubrica1.pdf')}>
          Descargar Rubrica 1
        </button>
      </div>
      <div>
        <h3>Evaluación 2:</h3>
        <p>Evaluación: {notas2.evaluacion}</p>
        <p>Nota: {notas2.nota}</p>
        <button onClick={() => downloadFile('rubrica2', 'Rubrica2.pdf')}>
          Descargar Rubrica 2
        </button>
      </div>
      <div>
        <h3>Evaluación 3:</h3>
        <p>Evaluación: {notas3.evaluacion}</p>
        <p>Nota: {notas3.nota}</p>
        <button onClick={() => downloadFile('rubrica3', 'Rubrica3.pdf')}>
          Descargar Rubrica 3
        </button>
      </div>
    </div>
  );
};

export default FileDownloadComponent;


