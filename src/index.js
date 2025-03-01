import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainPage from './pages/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MainPage />
    {/* <App /> */}
  </React.StrictMode>
);

