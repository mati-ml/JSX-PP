import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
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
    <div className="login-container">
      <div className="login-box">
        <h2>{t('login.title')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t('login.usernamePlaceholder')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? t('login.loading') : t('login.loginButton')}
          </button>
        </form>
        
        <div className="button-container">
          <Link to="/loginadmin">
            <button className="admin" id="boton-admin">
              {t('buttons.admin')}
            </button>
          </Link>

          <Link to="/register">
            <button id="register">
              {t('buttons.register')}
            </button>
          </Link>
        </div>
        
      </div>
      <div><LanguageSwitcher></LanguageSwitcher></div>
    </div>
  );
}

export default Login;










