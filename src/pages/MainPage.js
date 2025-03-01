import './MainPage.css';
import Header from '../components/Header';
import VersionList from '../components/VersionList';

function MainPage(){
    return(
    <div className="page">
      
      <header className="page-header">
        <Header />
      </header>

      <div className='page-body'>
        <VersionList />
        <button className='black-button'>Wczytaj plik SAP</button>
      </div>
      
    </div>
    );
}

export default MainPage;