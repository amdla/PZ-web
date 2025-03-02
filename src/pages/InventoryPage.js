import Header from '../components/Header';
import ReactTable from '../components/ReactTable';
import ScanInputSection from '../components/ScanInputSection';
import './InventoryPage.css';


function InventoryPage(){
    return(
        <div>
            <Header />
            <ScanInputSection />
            <ReactTable />
        </div>
    );
}

export default InventoryPage;