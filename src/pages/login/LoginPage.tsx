import { useState } from 'react';
import LoginView from '../../components/login/LoginView';
import SignupView from '../../components/login/SignupView';

import './LoginPage.css';

type LoginViews = 'login' | 'signup';

function LoginPage() {
  const [currentView, setCurrentView] = useState<LoginViews>('login');

  const viewComponents = {
    login: LoginView,
    signup: SignupView,
  };

  const ActiveView = viewComponents[currentView];

  const swapView = () => {
    if (currentView === 'login') setCurrentView(() => 'signup');
    else setCurrentView(() => 'login');
  };

  return (
    <div className="login__page">
      <title>Chrona | Log In</title>
      <h1>
        {currentView === 'login'
          ? 'Welcome Back!'
          : "We'd Love to Get to Know You!"}
      </h1>
      <button className="login-option" onClick={swapView}>
        <span className={currentView === 'login' ? 'active-option' : ''}>
          Log In
        </span>
        <span className={currentView === 'signup' ? 'active-option' : ''}>
          Sign Up
        </span>
      </button>
      <ActiveView />
    </div>
  );
}

export default LoginPage;
