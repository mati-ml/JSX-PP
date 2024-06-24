import React, { useState, useEffect } from 'react';

const FileDownloadComponent = () => {
  const [user_id, setUserId] = useState('');
  const [documents, setDocuments] = useState({
    rubrica1: null,
    rubrica2: null,
    rubrica3: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userIdFromCookie = getCookie('user_id');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchDocuments(userIdFromCookie);
    } else {
      console.error('User ID cookie not found');
      setError('User ID cookie not found');
    }
  }, []);

  const fetchDocuments = (userId) => {
    handleDownload('rubrica1', 'rubrica1', userId);
    handleDownload('rubrica2', 'rubrica2', userId);
    handleDownload('rubrica3', 'rubrica3', userId);
  };

  const handleDownload = async (endpoint, docKey, userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api2/${endpoint}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error(`Error al descargar el archivo desde ${endpoint}: ${response.statusText}`);
      }

      const blob = await response.blob();
      setDocuments(prevDocs => ({
        ...prevDocs,
        [docKey]: blob,
      }));
    } catch (error) {
      console.error(`Error al descargar el archivo desde ${endpoint}:`, error);
      setError(`Error al descargar el archivo desde ${endpoint}: ${error.message}`);
    }
  };

  const downloadFile = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      {documents.rubrica1 && <button onClick={() => downloadFile(documents.rubrica1, 'Rubrica1.pdf')}>Rubrica 1</button>}
      {documents.rubrica2 && <button onClick={() => downloadFile(documents.rubrica2, 'Rubrica2.pdf')}>Rubrica 2</button>}
      {documents.rubrica3 && <button onClick={() => downloadFile(documents.rubrica3, 'Rubrica3.pdf')}>Rubrica 3</button>}
    </div>
  );
};

export default FileDownloadComponent;


