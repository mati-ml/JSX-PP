import React, { useState } from "react";

import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo
import LanguageSwitcher from "./LanguageSwitcher";
function LoginAdmin({ onLoginSuccess }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();

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
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
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
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        </div>

        <div><LanguageSwitcher></LanguageSwitcher></div>
      </div>
  );
}

export default LoginAdmin;