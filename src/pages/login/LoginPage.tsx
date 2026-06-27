import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import './LoginPage.css';

function LoginPage() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(API_URL + '/auth/login', options);

    if (response.status === 401) {
      const data = await response.json();
      console.log(data);
    }

    let user = null;
    if (response.ok) {
      user = await response.json();
    }

    setEmail('');
    setPassword('');

    if (user) {
      setUser({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        birthdate: user.birthdate,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      });

      navigate('/home');
    }
  };

  return (
    <div className="login__page">
      <h1>Login</h1>
      <form id="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-accent">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
