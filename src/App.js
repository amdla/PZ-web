import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import OAuthRedirectPage from './pages/OAuthRedirectPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/" element={<OAuthRedirectPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/inventory/:inventoryId" element={<InventoryPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;