import React, { useState } from 'react';
import './ScanInputSection.css';
import { InventoryItem } from '../types'; 
import { getCookie } from '../utils/utils';

interface Props {
  tableData: InventoryItem[];
  setTableData: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

function ScanInputSection({ tableData, setTableData }: Props) {
  const [assetCode, setAssetCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const updateItemInBackend = async (itemId: number, payload: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${itemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || '',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Błąd zapisu (kod: ${response.status})`);
      }
    } catch (error) {
      console.error('Błąd przy aktualizacji w backendzie:', error);
      alert(`Nie udało się zapisać zeskanowanego przedmiotu: ${error}`);
    }
  }; 
  
  const handleScan = () => {
    if (!assetCode || !roomNumber) {
      alert("Wprowadź kod przedmiotu i numer sali!");
      return;
    }

    const updatedData = tableData.map((item) => {
      if (item.asset_component.toString() === assetCode) {

        updateItemInBackend(item.id, {
          scanned: true,
          currentRoom: roomNumber,
        });

        return {
          ...item,
          scanned: true,
          currentRoom: roomNumber, 
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
    <div id='scan-input-section'>
      <input
        type='text'
        placeholder='Wprowadź kod przedmiotu'
        className='input-scan'
        value={assetCode}
        onChange={(e) => setAssetCode(e.target.value)}
      />
      <input
        type='text'
        placeholder='Wprowadź numer sali'
        className='input-scan'
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />
      <button className='black-button' onClick={handleScan}>
        Zaznacz jako zeskanowany
      </button>
    </div>
  );
};

export default ScanInputSection;
