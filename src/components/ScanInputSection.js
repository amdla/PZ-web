import { useState } from 'react';
import './ScanInputSection.css';

function ScanInputSection({ tableData, setTableData }) {
  const [assetCode, setAssetCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const handleScan = () => {
    if (!assetCode || !roomNumber) {
      alert("Wprowadź kod przedmiotu i numer sali!");
      return;
    }

    const updatedData = tableData.map((item) => {
      if (item.asset_component.toString() === assetCode) {
        return {
          ...item,
          scanned: true,
          new_room: roomNumber,
        };
      }
      return item;
    });

    const itemFound = tableData.some((item) => item.asset_component.toString() === assetCode);

    if (!itemFound) {
      alert("Nie znaleziono przedmiotu o podanym kodzie!");
    }

    setTableData(updatedData);
    setAssetCode('');
    setRoomNumber('');
  };

  return (
    <div id="scan-input-section">
      <input
        type="text"
        placeholder="Wprowadź kod przedmiotu"
        className="input-scan"
        value={assetCode}
        onChange={(e) => setAssetCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Wprowadź numer sali"
        className="input-scan"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />
      <button className="black-button" onClick={handleScan}>
        Zaznacz jako zeskanowany
      </button>
    </div>
  );
}

export default ScanInputSection;
