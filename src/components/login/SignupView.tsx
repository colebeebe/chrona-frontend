import { useState } from 'react';
import { useUser } from '../../contexts/userContext';

import './SignupView.css';

const apiUrl = import.meta.env.VITE_API_URL;

function SignupView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setUser } = useUser();

  const youngestBirthdate = new Date();
  youngestBirthdate.setFullYear(youngestBirthdate.getFullYear() - 8);
  const youngBirthdateStr = youngestBirthdate.toISOString().split('T')[0];

  const handleFormSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
      username,
      birthdate: birthdate !== '' ? birthdate : null,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl + '/users', options);
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
  };

  return (
    <div className="signup-view">
      <form onSubmit={handleFormSubmit}>
        <div className="group-container">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="birthdate">Birthday</label>
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            max={youngBirthdateStr}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="group-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input
              type="email"
              name="confirmEmail"
              id="confirm-email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="group-container">
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-accent">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupView;
