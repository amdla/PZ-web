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
  const [inventoryName, setInventoryName] = useState<string | null>(null);

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
        .then((data: InventoryItem[]) => { 
            setTableData(data);
            console.log(data);
        })
        .catch((error) => {
            console.error("Error loading inventory items:", error);
        });
      fetch(`http://localhost:8000/inventories/${inventoryId}/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((inv) => setInventoryName(inv.name))
        .catch((err) => console.error("Nie udało się pobrać inwentarza", err));
    }
  }, [inventoryId]); 

  return (
    <div>
      <Header
        leftContent={
          <img
            src={myIcon}
            alt="Powrót"
            onClick={() => navigate('/')}
          />
        }
      />
      <div className="inventory-page">
        <div className="scan-header-row">
          {inventoryName && (
            <div className="inventory-label-inline">
              Edytujesz plik: <span>{inventoryName}</span>
            </div>
          )}
          <ScanInputSection tableData={tableData} setTableData={setTableData} />
        </div>

        <ReactTable tableData={tableData} setTableData={setTableData} />
      </div>
    </div>
  );
}

export default InventoryPage;
