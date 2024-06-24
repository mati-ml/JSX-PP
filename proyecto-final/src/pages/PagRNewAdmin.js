import React, { useState } from 'react';
import './Register.css'; // importar el archivo CSS

const RegisterAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastNamePaterno, setLastNamePaterno] = useState('');
  const [lastNameMaterno, setLastNameMaterno] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const role= 'admin'
  const carrera= 'admin'
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    console.debug("corriendo función para llamar a la api");
    e.preventDefault();

    const name = `${firstName} ${lastNamePaterno} ${lastNameMaterno}`;

    const user = {
      name,
      password,
      email,
      role,
      carrera,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/registeradmin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.info("Enviando datos...");
      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        console.info('Registration successful!', data);
        fetch('http://127.0.0.1:8000/api2/delete-teachers-evaluations/')

        // Aquí puedes realizar la solicitud GET a otra API
        

      }
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container"> {/* aplicar la clase */}
      <h2>Registrar Nuevo Admnin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido Paterno:</label>
          <input
            type="text"
            value={lastNamePaterno}
            onChange={(e) => setLastNamePaterno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido Materno:</label>
          <input
            type="text"
            value={lastNameMaterno}
            onChange={(e) => setLastNameMaterno(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterAdmin;
