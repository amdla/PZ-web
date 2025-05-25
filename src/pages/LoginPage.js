// src/pages/LoginPage.js
import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    // Przekieruj użytkownika do endpointu logowania na backendzie
    window.location.href = 'http://localhost:8000/oauth/login/';
  };

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