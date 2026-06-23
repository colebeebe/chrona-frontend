import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/auth';
import GlobalSidebar from './components/sidebars/GlobalSidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/home/HomePage';
import NotFound from './components/pages/errors/NotFound';

import './App.css';

function App() {
  useAuth();

  return (
    <>
      <GlobalSidebar />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
