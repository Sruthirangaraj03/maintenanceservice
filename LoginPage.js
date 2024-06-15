import React, { useState } from 'react';


import { Link } from 'react-router-dom'; // Import Link component

// ... rest of your LoginPage code

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Logging in with', { username, password });
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
     
      <p>Don't have an account?<Link to='/register'>Register Here</Link></p>
   
      </form>
    </div>
  );
}

export default LoginPage;
