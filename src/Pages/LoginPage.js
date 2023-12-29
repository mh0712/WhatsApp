import React, { useState } from 'react';
import '../components/LoginForm/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential);
        navigate('/ChattingPage');
    }).catch((error) => {
        console.log("login failed: ", error);
    })

  };

  const handleSignUp = () => {
    navigate('/SignUpPage')
  }

  return (
    <div className="LoginPage">
      <div className="login-container">
        <h2>Login to WhatsApp</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button type="text" onClick={handleSignUp}>SignUp</button>

      </div>
    </div>
  );
}

export default LoginPage;
