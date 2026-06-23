import { NavLink } from 'react-router-dom';

import { GoHome } from 'react-icons/go';
import { CiCalendar } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { IoSettingsOutline } from 'react-icons/io5';

import './GlobalSidebar.css';

function GlobalSidebar() {
  return (
    <div className="sidebar__global">
      <nav>
        <ul className="global__top-links">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              aria-label="home"
            >
              <GoHome size={30} strokeWidth={0.3} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              aria-label="calendar"
            >
              <CiCalendar size={30} strokeWidth={0.75} />
            </NavLink>
          </li>
        </ul>
        <ul className="global__bottom-links">
          <li>
            {/*
              TODO: Check if the user is logged in and change account button to
              interact accordingly
            */}
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              arial-label="login"
            >
              <VscAccount size={30} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              arial-label="settings"
            >
              <IoSettingsOutline size={30} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default GlobalSidebar;
