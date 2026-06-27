import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login__page">
      <h1>Login</h1>
      <form
        action="http://localhost:4000/auth/login"
        method="POST"
        id="login-form"
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit" className="btn btn-accent">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
