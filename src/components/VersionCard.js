import './VersionCard.css';
import { useNavigate } from 'react-router-dom';
import { generateXlsxFromItems } from '../utils/generateXlsx'; 

function VersionCard({ inventory }) {
  const navigate = useNavigate();

  // Zabezpieczenie na wypadek, gdyby propsy nie dotarły lub inventory jest puste
  if (!inventory) {
    return <div className='version-card-div'>Brak danych...</div>;
  }

  const handleClick = () => {
    navigate(`/inventory/${inventory.id}`); 
  };

 const handleGenerateClick = async (e) => {
  e.stopPropagation();

  try {
    const response = await fetch(`http://localhost:8000/items/?inventory_id=${inventory.id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Błąd przy pobieraniu danych z API');
    }

    const items = await response.json();
    generateXlsxFromItems(items, `${inventory.name}.xlsx`);
  } catch (err) {
    console.error(err);
    alert('Nie udało się wygenerować pliku Excel.');
  }
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