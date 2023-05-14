import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/signin" />
)}

export default ProtectedRoute;

// <Route  path="/" element={user ? <Home /> : <Register />} />
// <Route path="/login" element={user ? <Navigate to="/" replace /> :  <Login />}  />
// <Route path = "/register" element={user ? <Navigate to="/" replace /> :  <Register />} />
// передать замену в этих компонентах, чтобы избежать ненужных перенаправлений при нажатии кнопки «Назад» и «Вперед».
