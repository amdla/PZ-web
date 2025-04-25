import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import './InventoryPage.css';
import myIcon from '../icons/back.png';
import { useNavigate } from 'react-router-dom';

function InventoryPage() {
  const navigate = useNavigate();

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
        <ScanInputSection />
        <ReactTable />
      </div>
    </div>
  );
}


export default InventoryPage;