import React, { useState, useEffect } from 'react';

function Proyecto() {
  // Estados para almacenar los valores del formulario
  const [resumen, setResumen] = useState('');
  // Cargar la lista de profesores al montar el componente

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el user_id de la cookie
      const user_id = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1"), 10);
      console.log(user_id);
      // Realizar la solicitud POST a la API
      const response = await fetch('http://127.0.0.1:8000/api2/proyecto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          resumen
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
        Haga una descripcion de su proyecto en 1000 palabras
        <input type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} />
      </label>
      <button type="submit">Modificar Evaluación</button>
    </form>
  );
}

export default Proyecto;
