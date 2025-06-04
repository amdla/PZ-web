import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("oauth_token");
      const verifier = params.get("oauth_verifier");
      const state = params.get("state"); // <-- now required

      if (!token || !verifier || !state) {
        alert("Brak wymaganych parametrów logowania.");
        navigate("/login");
        return;
      }

      try {
        console.log("Rozpoczynam pobieranie danych...");

        const response = await fetch(
          `http://localhost:8000/oauth/callback/?oauth_token=${token}&oauth_verifier=${verifier}&state=${state}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        
        console.log("Odpowiedź z backendu:", response);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Błąd ${response.status}: ${text}`);
        }

        const userData = await response.json();

        // Zapisz dane użytkownika np. do localStorage lub do contextu
        localStorage.setItem("user", JSON.stringify(userData));

        // Przekierowanie na dashboard / strone główną
        console.log("Przekierowanie na /");
        navigate("/");
      } catch (error: any) {
        console.error("Błąd podczas logowania:", error.message);
        navigate("/login");
      }
    };

    fetchSession();
  }, [navigate]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Logowanie...</h2>
      <p>Trwa logowanie przez USOS. Proszę czekać...</p>
    </div>
  );
}

export default OAuthCallbackPage;
