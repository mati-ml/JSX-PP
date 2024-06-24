import React, { useState } from 'react';

const EvaluarEmpForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [nota, setNota] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/api2/testyou/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          nota: parseFloat(nota), // Asegúrate de que la nota sea un número
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Evaluación enviada correctamente.');
      } else {
        alert('Evaluacion enviada');
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error al enviar la evaluación.');
      alert('Evaluacion enviada');
    }
  };

  return (
    <div>
      <h2>Evaluar Pasante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">Correo Electrónico:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nota">Nota:</label>
          <input
            type="number"
            id="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            required
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <button type="submit">Enviar Evaluación</button>
      </form>
    </div>
  );
};

export default EvaluarEmpForm;
