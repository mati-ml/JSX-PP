import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Navigate } from 'react-router-dom';
import NavbarAdmin from '../components/navbaradmin';

const RegisterAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastNamePaterno, setLastNamePaterno] = useState('');
  const [lastNameMaterno, setLastNameMaterno] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = `${firstName} ${lastNamePaterno} ${lastNameMaterno}`;
    const user = {
      name,
      password,
      email,
      role: 'admin',
      carrera: 'admin',
    };

    try {
      const response = await fetch('http://48.216.215.72:8000/api/registeradmin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.info('Registration successful!', data);
        setMessage('Registration successful!');
        alert('Se ha registrado correctamente');
        setNavigate(true);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message || 'Unknown error'}`);
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
      console.error('Registration failed:', error);
    }
  };

  if (navigate) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
    <NavbarAdmin></NavbarAdmin>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
          <h2>{t('register.title')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">{t('register.firstNameLabel')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t('register.lastNamePaternoLabel')}</label>
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
                <label className="form-label">{t('register.lastNameMaternoLabel')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastNameMaterno}
                  onChange={(e) => setLastNameMaterno(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t('register.emailLabel')}</label>
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
                <label className="form-label">{t('register.passwordLabel')}</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {t('register.registerButton')}
            </button>
          </form>
          {message && <p className="mt-3">{message}</p>}
          <div className="mt-3 d-flex justify-content-center">
            <LanguageSwitcher />
          </div>
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
};

export default RegisterAdmin;

