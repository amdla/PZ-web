import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthRedirectPage = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        await checkAuth();        // sprawdź zalogowanie
        navigate('/');            // przekieruj do strony głównej
      } catch (error) {
        console.error("Błąd podczas kończenia logowania:", error);
        navigate('/login');       // jak coś pójdzie nie tak
      }
    };

    finishLogin();
  }, []);

  return <div>Logowanie zakończone, przekierowuję...</div>;
};

export default OAuthRedirectPage;
