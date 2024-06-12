import React, { useState } from 'react';
import './Register.css'; // importar el archivo CSS

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastNamePaterno, setLastNamePaterno] = useState('');
  const [lastNameMaterno, setLastNameMaterno] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [carrera, setCarrera] = useState('');
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
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
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
      <h2>Register</h2>
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
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <label>Carrera:</label>
          <select
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            required
          >
            <option value="">Select Carrera</option>
            <option value="Derecho">Derecho</option>
            <option value="Periodismo">Periodismo</option>
            <option value="Ing. civil Informática">Ing Civil Informática</option>
            <option value="Ing. Comercial">Ing Comercial</option>
            <option value="Ing. Civil Industrial">Ing Civil Industrial</option>
            <option value="Ing. Civil en Obras Civiles">Ing Civil en Obras Civiles</option>
            <option value="Ing. Civil en Energía">Ing Civil en Energía</option>
            <option value="Ing. Civil Mecánica">Ing Civil Mecánica</option>
            <option value="Ing. en Diseño">Ing en Diseño</option>
            <option value="Ing. Civil en Biotecnología">Ing Civil en Medicina</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
