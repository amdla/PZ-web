import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import './InventoryPage.css';


function InventoryPage(){
    return(
    <div>
        <Header />
        <div className='inventory-page'>
            <ScanInputSection />
            <ReactTable />
        </div>
    </div>
        
    );
}

export default InventoryPage;