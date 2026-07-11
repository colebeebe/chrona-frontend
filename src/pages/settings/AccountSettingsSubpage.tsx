import { NavLink } from 'react-router-dom';

import { useUser } from '../../contexts/userContext';

import './AccountSettingsSubpage.css';

const API_URL = import.meta.env.VITE_API_URL;

function AccountSettings() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    await fetch(API_URL + '/auth/logout');
    setUser(null);
  };

  return (
    <div className="account-settings__subpage">
      <h1>Account</h1>

      {user ? (
        <div className="user-account-info">
          <div className="info-collection">
            <div className="info-group">
              <h2>Email</h2>
              <p>{user.email}</p>
            </div>

            <div className="info-group">
              <h2>Username</h2>
              <p>{user.username}</p>
            </div>
          </div>

          <div className="info-collection">
            <div className="info-group">
              <h2>Name</h2>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>

            {user.birthdate ? (
              <div className="info-group">
                <h2>Birthday</h2>
                <p>{new Date(user.birthdate).toLocaleDateString()}</p>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="info-collection">
            <div className="info-group">
              <h2>Joined</h2>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* <p>{JSON.stringify(user, null, 2)}</p> */}

          <div className="btn-container">
            <button className="btn btn-accent">Edit Account</button>
            <button className="btn btn-red" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="no-user-message">
          <p>No user logged in.</p>
          <NavLink to="/login" className="btn btn-accent">
            Log In
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
