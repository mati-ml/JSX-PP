import React, { useState } from "react";
import "./Login.css"; // Asegúrate de crear este archivo CSS y enlazarlo

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("email", username);
      formData.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();

      document.cookie = `user_role=${data.user_role}; path=/`;
      onLoginSuccess(data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button type="submit" onClick={handleLogin}>Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;









