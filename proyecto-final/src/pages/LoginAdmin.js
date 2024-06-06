import React, { useState } from "react";

import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo

function LoginAdmin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    console.debug('Entrando a Función');
    try {
      const formData = {
        email: username,
        password: password
      };

      
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      console.info("Realizando solicitud de inicio de sesión...");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      const data = await response.json();
      if (data.user_role !== "admin") {
        throw new Error("Usuario no autorizado");
      }
      
      document.cookie = `user_role=${data.user_role}; path=/`;
      onLoginSuccess(data);
      console.info("Inicio de sesión exitoso.");
    } catch (error) {
      setError(error.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error al iniciar sesión:", error);
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
        <h2>Iniciar sesión como administrador</h2>
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
          <button type="submit" disabled={isLoading} id="boton-admin">
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;