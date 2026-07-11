import { Navigate, Routes, Route } from 'react-router-dom';

import { useAuth } from './hooks/auth';
import { useThemeHook } from './hooks/theme';

import GlobalSidebar from './components/sidebars/GlobalSidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/home/HomePage';

import Calendar from './pages/calendar/CalendarPage';
import EventsSubpage from './pages/calendar/EventsSubpage';
import TodoSubpage from './pages/calendar/TodoSubpage';

import SettingsPage from './pages/settings/SettingsPage';
import GeneralSettingsSubpage from './pages/settings/GeneralSettingsSubpage';
import AccountSettingsSubpage from './pages/settings/AccountSettingsSubpage';

import Login from './pages/login/LoginPage';

import NotFound from './pages/errors/NotFound';

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
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<GeneralSettingsSubpage />} />
          <Route path="account" element={<AccountSettingsSubpage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
