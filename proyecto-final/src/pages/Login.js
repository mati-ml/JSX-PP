import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg'; // Replace with your actual image path
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation(); // Función de traducción

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    console.debug('Corriendo Funcion handleLogin');
    try {
      const formData = {
        email: username,
        password: password
      };
      
      console.info('Enviando solicitud de inicio de sesión...');
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('errorMessages.generic'));
      }

      const data = await response.json();
      if (data.user_role === "admin") {
        throw new Error(t('errorMessages.unauthorized'));
      }
      document.cookie = `user_role=${data.user_role}; path=/`;
      document.cookie = `user_id=${data.user_id}; path=/`;
      document.cookie = `user_email=${data.user_email}; path=/`;
      onLoginSuccess(data);
      console.info(t('successMessages.loginSuccess'));
    } catch (error) {
      setError(error.message || t('login.error'));
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">{t('login.title')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t('login.usernamePlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder={t('login.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isLoading}>
              {isLoading ? t('login.loading') : t('login.loginButton')}
            </button>
          </form>

          <div className="d-flex justify-content-between">
            <Link to="/loginadmin" className="btn btn-secondary me-2">
              {t('buttons.admin')}
            </Link>
            <Link to="/register" className="btn btn-secondary ml-2">
              {t('buttons.register')}
            </Link>
          </div>

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


export default Login;
