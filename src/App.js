import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
}

export default App;
