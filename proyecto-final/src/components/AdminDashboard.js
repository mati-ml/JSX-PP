// AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2>Panel de Administrador</h2>
      <p>Menú para administradores</p>
      <ul>
        <li>
          <Link to="/dashboard/admin/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/settings">Configuración</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
