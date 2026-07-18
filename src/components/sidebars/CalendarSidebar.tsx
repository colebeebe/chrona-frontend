import { NavLink } from 'react-router-dom';
import './localSidebar.css';

function CalendarSidebar() {
  return (
    <div className="sidebar__local">
      <div className="sidebar__local__foreground">
        <ul>
          <li>
            <NavLink
              end
              to="/calendar"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="todo"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              To-Do
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="plan"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Plan
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CalendarSidebar;
