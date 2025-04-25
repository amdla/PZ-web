import './VersionCard.css';
import { useNavigate } from 'react-router-dom';

function VersionCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inventory');
  };

  return (
    <div className='version-card-div' onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span id='version'>Wersja 17.01</span>
      <button
        id='generate-xsl'
        className='black-button'
        onClick={(e) => {
          e.stopPropagation(); // nie przechodź do inventory przy kliknięciu w przycisk
          alert('Wygeneruj Excel tutaj'); // placeholder, zmienisz na logikę generowania
        }}
      >
        Wygeneruj plik Excel
      </button>
    </div>
  );
}

export default VersionCard;
