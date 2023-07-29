import React, { useState } from 'react';
import axios from 'axios';
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    
    if (password.length < 8) {
      setErrorMessage('Password should be at least 8 characters.');
      return;
    }
  
    
    setErrorMessage('');
  
    try {
      const response = await axios.post('http://34.193.40.199:3001/api/login', {
        emailid: email,
        password: password,
      });
  
      
      if (response.data.result === 'success') {
        
        localStorage.setItem('userId', response.data.userid);
  
        
        console.log('Login success! User ID:', response.data.userid);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      
      console.error('API Error:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };
  
  return (
    
    <div className='container'>
      
      <form onSubmit={handleSubmit}>
      
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
