import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage'; // Importuj LoginPage
import { AuthProvider } from './contexts/AuthContext'; // Importuj AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importuj ProtectedRoute

function App() {
  return (
    // 1. Owiń wszystko w AuthProvider
    <AuthProvider>
      <Routes>
        {/* 2. Dodaj trasę do strony logowania - dostępna dla wszystkich */}
        <Route path="/login" element={<LoginPage />} />

        {/* 3. Utwórz grupę tras chronionych */}
        <Route element={<ProtectedRoute />}>
          {/* Wszystkie trasy wewnątrz będą chronione */}
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          {/* Możesz tu dodać więcej chronionych tras */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;