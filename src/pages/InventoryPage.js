import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import { useNavigate } from 'react-router-dom';
import './InventoryPage.css';
import myIcon from '../icons/back.png';

function InventoryPage() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('/inventoryData.json')
      .then((response) => response.json())
      .then((data) => setTableData(data))
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
