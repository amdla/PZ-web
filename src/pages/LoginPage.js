import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const popup = window.open(
      "http://localhost:8000/oauth/login/",
      "OAuthLogin",
      "width=600,height=700"
    );

    const receiveMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;

      const user = event.data;
      if (user && user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // 🚀 przekieruj na stronę główną
      } else {
        alert("Błąd logowania");
        navigate("/login");
      }

      window.removeEventListener("message", receiveMessage);
    };

    window.addEventListener("message", receiveMessage);
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
