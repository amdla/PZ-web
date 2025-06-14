import React, { useEffect, useState } from 'react';
import './Header.css';

function Header({ leftContent }: { leftContent?: React.ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/status/', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Nie udało się pobrać danych użytkownika');

        const data = await response.json();
        if (data.username) {
          const usosId = data.username.replace('usos_', '');
          setUserName(`${usosId}@pw.edu.pl`);
        }
      } catch (error) {
        console.error('Błąd przy pobieraniu użytkownika:', error);
      }
    };

    fetchUserData();
}, []);

const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8000/logout/', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      throw new Error('Błąd wylogowania');
    }
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    alert('Nie udało się wylogować.');
  }
};


  return (
    <header className="page-header">
      <div className="flex-row">
        <div className="header-left">
          {leftContent && <div className="custom-left">{leftContent}</div>}
          <h1 className="app-title">Aplikacja do inwentaryzacji</h1>
        </div>
        <div className="header-right">
          <p>
            {userName
              ? `Zalogowano jako ${userName}`
              : 'Trwa sprawdzanie logowania...'}
          </p>
          <button className="black-button" id="logout" onClick={handleLogout}>
            Wyloguj
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
