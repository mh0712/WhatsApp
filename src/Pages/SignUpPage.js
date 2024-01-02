import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../firebase';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential);
        navigate('/ChattingPage');
    }).catch((error) => {
        console.log("login failed: ", error);
    })

  };

  const handleBackPage = () => {
    navigate('/LoginPage')
  }

  return (
    <div className="SignUp">
      <div className="login-container">
        <h2>Sign Up to WhatsApp</h2>
        <form onSubmit={handleSignUp}>
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
          <button type="submit">SignUp</button>
        </form>
          <button type="text" onClick={handleBackPage}>Back to Login</button>
      </div>
    </div>
  );
}

export default SignUpPage;
