import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import { useNavigate } from 'react-router-dom';
import './InventoryPage.css';
import myIcon from '../icons/back.png';

interface InventoryItem {
  id: number;
  inventory: number;
  department: number;
  asset_group: number;
  category: string;
  inventory_number: string;
  asset_component: number;
  sub_number: number;
  acquisition_date: string;
  asset_description: string;
  quantity: number;
  initial_value: string;
  room: string;
  new_room: string;
  scanned: boolean;
}

function InventoryPage() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch('/inventoryData.json')
      .then((response) => response.json())
      .then((data: InventoryItem[]) => setTableData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div>
      <div className='header'>
        <img
          src={myIcon}
          alt="Back icon"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <Header />  
      </div>
      <div className='inventory-page'>
        <ScanInputSection tableData={tableData} setTableData={setTableData} />
        <ReactTable tableData={tableData} setTableData={setTableData} />
      </div>
    </div>
  );
}

export default InventoryPage;
