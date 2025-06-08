import React from 'react';
import './LoginPage.css';

function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/oauth/login/";
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Wymagane logowanie</h1>
      <p className="login-description">Aby kontynuować, zaloguj się przez USOS.</p>
      <button className="login-button" onClick={handleLogin}>
        Zaloguj się z USOS
      </button>
    </div>
  );
}

export default LoginPage;
