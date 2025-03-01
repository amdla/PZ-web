import './App.css';
import Header from './components/Header';
import VersionList from './components/VersionList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <VersionList />
    </div>
  );
}

export default App;
