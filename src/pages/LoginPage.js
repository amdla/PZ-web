import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const redirect = encodeURIComponent('http://localhost:3000/oauth/callback/');
    window.location.href = `http://localhost:8000/oauth/login/?redirect_uri=${redirect}`;
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("oauth_token");
    const verifier = params.get("oauth_verifier");

    if (token && verifier) {
      // Jeśli wróciłeś z USOS i masz tokeny w URL, przekieruj na /oauth/callback/
      navigate('/oauth/callback' + window.location.search);
    }
  }, [navigate]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Wymagane Logowanie</h1>
      <p>Aby kontynuować, zaloguj się przez USOS.</p>
      <button 
        onClick={handleLogin} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Zaloguj się z USOS
      </button>
    </div>
  );
}

export default LoginPage;
