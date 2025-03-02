import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainPage from './pages/MainPage';
import InventoryPage from './pages/InventoryPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <InventoryPage />
    {/* <MainPage /> */}
    {/* <App /> */}
  </React.StrictMode>
);

