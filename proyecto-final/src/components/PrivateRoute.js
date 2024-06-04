import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, userRole, allowedRole, ...rest }) => {
  return (
    <Route
      {...rest}
      element={userRole === allowedRole ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
