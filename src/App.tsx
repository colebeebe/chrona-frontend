import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/auth';
import GlobalSidebar from './components/sidebars/GlobalSidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/home/HomePage';
import Calendar from './components/pages/calendar/CalendarPage';
import SettingsPage from './components/pages/settings/SettingsPage';
import GeneralSettingsSubpage from './components/pages/settings/GeneralSettingsSubpage';
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
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<GeneralSettingsSubpage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
