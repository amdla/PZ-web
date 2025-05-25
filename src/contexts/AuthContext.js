import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, loading: true });
  const navigate = useNavigate(); // Użyj hooka useNavigate

  // Funkcja do sprawdzania statusu logowania
  const checkAuth = async () => {
    setAuth(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch('http://localhost:8000/api/check-auth/', { // Użyj ścieżki z Django
          credentials: 'include', // Ważne!
      });
      if (response.ok) {
        const data = await response.json();
        setAuth({ isAuthenticated: true, user: data.user, loading: false });
      } else {
        setAuth({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      console.error("Błąd sprawdzania statusu logowania:", error);
      setAuth({ isAuthenticated: false, user: null, loading: false });
    }
  };

  // Funkcja do wylogowania
  const handleLogout = async () => {
      try {
          const response = await fetch('http://localhost:8000/logout/', { // Użyj ścieżki wylogowania
              method: 'GET', // Użyj GET (zgodnie z Twoim views.py) lub POST
              credentials: 'include',
          });
          if (response.ok) {
             setAuth({ isAuthenticated: false, user: null, loading: false });
             navigate('/login'); // Przekieruj na stronę logowania po wylogowaniu
          } else {
             console.error("Wylogowanie nie powiodło się");
          }
      } catch (error) {
          console.error("Błąd podczas wylogowywania:", error);
      }
  };

  // Sprawdź status logowania przy pierwszym ładowaniu
  useEffect(() => {
    checkAuth();
  }, []); // Pusta tablica zależności oznacza, że uruchomi się tylko raz

  return (
    <AuthContext.Provider value={{ auth, checkAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook ułatwiający korzystanie z kontekstu
export const useAuth = () => useContext(AuthContext);