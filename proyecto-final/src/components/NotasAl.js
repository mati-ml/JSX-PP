import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FileDownloadComponent = () => {
  const { t } = useTranslation();

  const [user_id, setUserId] = useState('');
  const [notas1, setNotas1] = useState({ evaluacion: '', nota: '' });
  const [notas2, setNotas2] = useState({ evaluacion: '', nota: '' });
  const [notas3, setNotas3] = useState({ evaluacion: '', nota: '' });
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const userIdFromCookie = getCookie('user_id');
        if (!userIdFromCookie) {
          throw new Error(t('errors.cookieNotFound'));
        }
        setUserId(userIdFromCookie);

        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userIdFromCookie }),
        };

        const [response1, response2, response3] = await Promise.all([
          fetch(`http://localhost:8000/api2/eval1/`, fetchOptions),
          fetch(`http://localhost:8000/api2/eval2/`, fetchOptions),
          fetch(`http://localhost:8000/api2/eval3/`, fetchOptions),
        ]);

        if (!response1.ok) {
          throw new Error(`${t('errors.fetchError')} 1: ${response1.statusText}`);
        }
        const data1 = await response1.json();
        setNotas1({ evaluacion: data1.evaluacion1, nota: data1.nota1 });

        if (!response2.ok) {
          throw new Error(`${t('errors.fetchError')} 2: ${response2.statusText}`);
        }
        const data2 = await response2.json();
        setNotas2({ evaluacion: data2.evaluacion2, nota: data2.nota2 });

        if (!response3.ok) {
          throw new Error(`${t('errors.fetchError')} 3: ${response3.statusText}`);
        }
        const data3 = await response3.json();
        setNotas3({ evaluacion: data3.evaluacion3, nota: data3.nota3 });

        setFetching(false); // Indicar que la obtención de notas ha terminado

      } catch (error) {
        console.error('Error en la obtención de notas:', error);
        setError1(`${t('errors.fetchError')}: ${error.message}`);
        setError2(`${t('errors.fetchError')}: ${error.message}`);
        setError3(`${t('errors.fetchError')}: ${error.message}`);
        setFetching(false); // Indicar que ha ocurrido un error al obtener las notas
      }
    };

    fetchNotas();

  }, []); // El array vacío asegura que useEffect se ejecute solo una vez, al montar el componente

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
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
        throw new Error(`${t('errors.downloadError')} ${endpoint}: ${response.statusText}`);
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
      console.error(`${t('errors.downloadError')} ${endpoint}:`, error);
      // Aquí podrías manejar el error de descarga si lo necesitas
    }
  };

  if (fetching) {
    return <p>{t('loading')}</p>; // Mientras se obtienen las notas
  }

  return (
    <div>
      <div>
        <h3>{t('evaluation')} 1:</h3>
        <p>{t('evaluationLabel')}: {notas1.evaluacion}</p>
        <p>{t('gradeLabel')}: {notas1.nota}</p>
        <button onClick={() => downloadFile('rubrica1', 'Rubrica1.pdf')}>
          {t('downloadRubric')} 1
        </button>
      </div>
      <div>
        <h3>{t('evaluation')} 2:</h3>
        <p>{t('evaluationLabel')}: {notas2.evaluacion}</p>
        <p>{t('gradeLabel')}: {notas2.nota}</p>

        <button onClick={() => downloadFile('rubrica2', 'Rubrica2.pdf')}>
          {t('downloadRubric')} 2
        </button>
      </div>

      <div>
        <h3>{t('evaluation')} 3:</h3>
        <p>{t('evaluationLabel')}: {notas3.evaluacion}</p>
        <p>{t('gradeLabel')}: {notas3.nota}</p>

        <button onClick={() => downloadFile('rubrica3', 'Rubrica3.pdf')}>
          {t('downloadRubric')} 3
        </button>
      </div>
    </div>
  );
};

export default FileDownloadComponent;
