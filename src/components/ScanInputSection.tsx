import './ScanInputSection.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { markScanned } from '../features/inventory/inventorySlice';

function ScanInputSection() {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.inventory.items);

  const [assetCode, setAssetCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const handleScan = () => {
    if (!assetCode || !roomNumber) {
      alert("Wprowadź kod przedmiotu i numer sali!");
      return;
    }

    const exists = tableData.some(item => item.asset_component.toString() === assetCode);
    if (!exists) {
      alert("Nie znaleziono przedmiotu o podanym kodzie!");
      return;
    }

    dispatch(markScanned({ asset_component: Number(assetCode), new_room: roomNumber }));
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
}

export default ScanInputSection;
