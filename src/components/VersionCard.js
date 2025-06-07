import './VersionCard.css';
import { useNavigate } from 'react-router-dom';
import { generateXlsxFromItems } from '../utils/generateXlsx'; 
import { getCookie } from '../utils/utils';
import myIcon from '../icons/trash.png';

function VersionCard({ inventory, onDelete }) {
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

const handleDeleteClick = async (e) => {
  e.stopPropagation();

  const confirmDelete = window.confirm(`Czy na pewno chcesz usunąć "${inventory.name}"?`);
  if (!confirmDelete) return;

  try {
    const csrftoken = getCookie("csrftoken");

    const response = await fetch(`http://localhost:8000/inventories/${inventory.id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Błąd przy usuwaniu inwentarza');
    }

    alert('Inwentarz został usunięty.');
    if (typeof onDelete === 'function') {
      onDelete();
    }
  } catch (err) {
    console.error(err);
    alert('Nie udało się usunąć inwentarza.');
  }
};


  return (
    <div className='version-card-div' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span id='version'>{inventory.name}</span>
      <div className="button-group">
        <button
          id="generate-xsl"
          className="black-button"
          onClick={handleGenerateClick}
        >
          Wygeneruj plik Excel
        </button>
        <button
          className="red-button"
          onClick={handleDeleteClick}
        >
          Usuń
        <img
            src={myIcon}
            alt="Usuń"
            style={{ width: '18px', height: '18px' }}
        />
        </button>
      </div>
    </div>
  );
}

export default VersionCard;