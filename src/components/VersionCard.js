import './VersionCard.css';
import { useNavigate } from 'react-router-dom';

function VersionCard({ inventory }) {
  const navigate = useNavigate();

  // Zabezpieczenie na wypadek, gdyby propsy nie dotarły lub inventory jest puste
  if (!inventory) {
    return <div className='version-card-div'>Brak danych...</div>;
  }

  const handleClick = () => {
    navigate(`/inventory/${inventory.id}`); 
  };

  const handleGenerateClick = (e) => {
      e.stopPropagation();
      // Tutaj logika generowania Excela dla inventory.id
      alert(`Rozpocznij generowanie Excela dla inwentarza: ${inventory.name} (ID: ${inventory.id})`);
      // Możesz wywołać funkcję, która wyśle zapytanie do API o wygenerowanie pliku
  };

  return (
    <div className='version-card-div' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span id='version'>{inventory.name}</span>
      <button
        id='generate-xsl'
        className='black-button'
        onClick={handleGenerateClick}
      >
        Wygeneruj plik Excel
      </button>
    </div>
  );
}

export default VersionCard;