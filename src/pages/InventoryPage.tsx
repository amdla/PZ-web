import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import { useNavigate, useParams } from 'react-router-dom';
import './InventoryPage.css';
import myIcon from '../icons/back.png';
import { InventoryItem } from '../types'; 


function InventoryPage() {
  const navigate = useNavigate();
  const { inventoryId } = useParams<{ inventoryId: string }>(); 
  const [tableData, setTableData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    if (inventoryId) {
      fetch(`http://localhost:8000/items/?inventory_id=${inventoryId}`, {
          credentials: "include", 
      })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Błąd sieci: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data: Omit<InventoryItem, 'scanned'>[]) => {
            const enhancedData = data.map(item => ({
                ...item,
                scanned: false 
            }));
            setTableData(enhancedData);
        })
        // jak dodadzą scanned od backendu to trzeba te górne .then zamienić na to:
        //  .then((data: InventoryItem[]) => { 
        //     setTableData(data);
        // })
        .catch((error) => {
            console.error("Error loading inventory items:", error);
        });
    } 
  }, [inventoryId]); 

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
