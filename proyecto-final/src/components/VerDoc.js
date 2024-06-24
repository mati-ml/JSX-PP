import React, { useState } from 'react';

const FileDownloadComponent1 = () => {
  const [user_id, setUserId] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch('http://48.216.215.72:8000/api2/document/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        throw new Error('Error al descargar el archivo');
      }

      // Convertir la respuesta a un blob (archivo binario)
      const blob = await response.blob();

      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace invisible para descargar el archivo
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'documento.pdf'; // Nombre del archivo que se descargará
      document.body.appendChild(a);
      a.click();

      // Limpiar el objeto URL y remover el enlace del DOM
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User ID"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default FileDownloadComponent1;



