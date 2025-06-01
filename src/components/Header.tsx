import React, { useEffect, useState } from 'react';
import './Header.css';

interface UserData {
  email: string;
}

function Header() {
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

  return (
    <header className="page-header">
      <div className='flex-row'>
        <p>
          {userName
            ? `Zalogowano jako ${userName}`
            : 'Trwa sprawdzanie logowania...'}
        </p>
        <button className='black-button' id='logout'>Wyloguj</button>
      </div>
    </header>
  );
}

export default Header;
