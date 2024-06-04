// Login.js
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    // Form data
    const formData = new FormData();
    formData.append("email", username); // Assuming username is the email
    formData.append("password", password);

    // Fetch options
    const options = {
      method: "POST",
      body: formData,
    };

    // Fetch to login endpoint
    fetch("http://127.0.0.1:8000/api/login/", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        // Setear el estado de autenticación o almacenar el token JWT en localStorage
        document.cookie = `user_role=${data.user_role}; path=/`;
        document.cookie = `user_id=${data.user_id}; path=/`;
        // Redirigir al dashboard correspondiente
        switch (data.user_role) {
          case "student":
            window.location.href = "/student";
            break;
          case "teacher":
            window.location.href = "/teacher";
            break;
          case "admin":
            window.location.href = "/admin";
            break;
          default:
            // En caso de un rol desconocido, podrías redirigirlo a una página de inicio predeterminada o mostrar un mensaje de error
            alert("Rol desconocido");
            break;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      });
  };

  return ( 
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          placeholder="Ingresa tu correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={handleLogin}>Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;





