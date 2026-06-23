import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/auth';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/home/HomePage';

import './App.css';

function App() {
  useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <div>Test</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
