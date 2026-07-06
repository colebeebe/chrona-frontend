import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/auth';
import { useThemeHook } from './hooks/theme';

import GlobalSidebar from './components/sidebars/GlobalSidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/pages/home/HomePage';
import Calendar from './components/pages/calendar/CalendarPage';
import EventsSubpage from './components/pages/calendar/EventsSubpage';
import TodoSubpage from './components/pages/calendar/TodoSubpage';
import SettingsPage from './components/pages/settings/SettingsPage';
import GeneralSettingsSubpage from './components/pages/settings/GeneralSettingsSubpage';
import NotFound from './components/pages/errors/NotFound';

import './App.css';

function App() {
  useAuth();
  useThemeHook();

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
        >
          <Route index element={<EventsSubpage />} />
          <Route path="todo" element={<TodoSubpage />} />
        </Route>
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<GeneralSettingsSubpage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
