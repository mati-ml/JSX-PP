import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import backgroundImage from './PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg'; // Ruta de tu imagen de fondo
import LanguageSwitcher from './LanguageSwitcher';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastNamePaterno, setLastNamePaterno] = useState('');
  const [lastNameMaterno, setLastNameMaterno] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [carrera, setCarrera] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation(); // Función de traducción
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
      const response = await fetch('http://localhost:8000/api/register/', {
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
        fetch('http://48.216.215.72:8000/api2/delete-teachers-evaluations/')

        // Aquí puedes realizar la solicitud GET a otra API
        

      }
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
      console.error('Registration failed:', error);
    }
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-4">{t('Register')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">{t('First Name')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">{t('Last Name (Paternal)')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastNamePaterno}
                  onChange={(e) => setLastNamePaterno(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">{t('Last Name (Maternal)')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastNameMaterno}
                  onChange={(e) => setLastNameMaterno(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">{t('Email')}</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('Password')}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('Role')}</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">{t('Select Role')}</option>
                <option value="teacher">{t('Teacher')}</option>
                <option value="student">{t('Student')}</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">{t('Career')}</label>
              <select
                className="form-select"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
                required
              >
                <option value="">{t('Select Career')}</option>
                <option value="Derecho">{t('Law')}</option>
                <option value="Periodismo">{t('Journalism')}</option>
                <option value="Ing. civil Informática">{t('Computer Engineering')}</option>
                <option value="Ing. Comercial">{t('Business Administration')}</option>
                <option value="Ing. Civil Industrial">{t('Industrial Engineering')}</option>
                <option value="Ing. Civil en Obras Civiles">{t('Civil Engineering')}</option>
                <option value="Ing. Civil en Energía">{t('Energy Engineering')}</option>
                <option value="Ing. Civil Mecánica">{t('Mechanical Engineering')}</option>
                <option value="Ing. en Diseño">{t('Design Engineering')}</option>
                <option value="Ing. Civil en Biotecnología">{t('Biomedical Engineering')}</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">{t('Register')}</button>
          </form>
          <div className="mt-3 d-flex justify-content-center">
            <LanguageSwitcher />
          </div>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
  
      {/* Estilo de fondo para cubrir toda la página */}
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
}

export default Register;
