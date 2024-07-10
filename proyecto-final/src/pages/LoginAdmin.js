import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import backgroundImage from './PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
function LoginAdmin({ onLoginSuccess }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();
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
      const response = await fetch("http://48.216.215.72:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      const data = await response.json();
      if (data.user_role !== "admin") {
        throw new Error("Usuario no autorizado");
      }
      document.cookie = `user_role=${data.user_role}; path=/`;
      document.cookie = `user_id=${data.user_id}; path=/`;
      onLoginSuccess(data);
      console.info('Inicio de sesión exitoso.');
    } catch (error) {
      setError(error.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo.");
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
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 shadow">
        <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="card-title text-center mb-4">{t('loginTitle')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t('usernamePlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? t('loading') : t('login')}
            </button>
          </form>
          <div className="mt-3">
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
}

export default LoginAdmin;