import { useUser } from '../../../contexts/userContext';

import './HomePage.css';

function Home() {
  const { user } = useUser();
  return (
    <div className="home__page">
      <title>Chrona | Home</title>
      <h1>{user ? `Welcome back, ${user.firstName}` : 'Welcome to Chrona.'}</h1>
    </div>
  );
}

export default Home;
