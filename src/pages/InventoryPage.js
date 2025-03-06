import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import './InventoryPage.css';
import myIcon from '../icons/back.png';

function InventoryPage(){
    return(
    <div>
        <div className='header'>
            <img
                src={myIcon} 
                alt="Back icon" 
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