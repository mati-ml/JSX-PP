import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      const response = await fetch('http://48.216.215.72:8000/api/registeradmin/', {
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
        fetch('http://loclahost:8000/api2/delete-teachers-evaluations/')

        // Aquí puedes realizar la solicitud GET a otra API
        

      }
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Nuevo Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellido Paterno:</label>
            <input
              type="text"
              className="form-control"
              value={lastNamePaterno}
              onChange={(e) => setLastNamePaterno(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Apellido Materno:</label>
            <input
              type="text"
              className="form-control"
              value={lastNameMaterno}
              onChange={(e) => setLastNameMaterno(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );}
export default RegisterAdmin;
