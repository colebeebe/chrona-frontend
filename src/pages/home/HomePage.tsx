import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

import './HomePage.css';

function Home() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    const response = await fetch(API_URL + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    console.log(response);

    setUser(null);
    navigate('/home');
  };

  return (
    <div className="home__page">
      <title>Chrona | Home</title>
      <h1>{user ? `Welcome back, ${user.firstName}` : 'Welcome to Chrona.'}</h1>
      {user ? (
        <button className="btn btn-accent" onClick={handleLogout}>
          Log Out
        </button>
      ) : null}
    </div>
  );
}

export default Home;
