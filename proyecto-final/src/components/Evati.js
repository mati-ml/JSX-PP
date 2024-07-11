import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
const EvaluarEmpForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [nota, setNota] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://48.216.215.72:8000/api2/testyou/', {
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
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="border p-4 rounded shadow-sm bg-white" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Evaluar Pasante</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userEmail">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="nota">
            <Form.Label>Nota:</Form.Label>
            <Form.Control
              type="number"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              required
              min="0"
              max="10"
              step="0.1"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Enviar Evaluación
          </Button>
        </Form>
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

export default EvaluarEmpForm;
