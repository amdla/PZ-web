import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { auth } = useAuth(); // Pobierz stan autentykacji z kontekstu

  // Jeśli stan jeszcze się ładuje, pokaż informację
  if (auth.loading) {
    return <div>Ładowanie...</div>;
  }

  // Jeśli użytkownik jest zalogowany, pokaż komponent (dziecko) tej trasy.
  // <Outlet /> renderuje komponent przypisany do trasy w App.js.
  // Jeśli nie jest zalogowany, przekieruj na /login.
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;