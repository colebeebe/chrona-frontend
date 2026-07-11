import { useState } from 'react';
import { useUser } from '../../contexts/userContext';

import './LoginView.css';

function LoginView() {
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch('http://localhost:4000/auth/login', options);

    let user = null;
    if (response.ok) {
      user = await response.json();
    }

    if (user) {
      setUser({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        username: user.username,
        birthdate: user.birthdate,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      });
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-view">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-accent">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginView;
