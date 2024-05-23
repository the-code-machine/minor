'use client'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/common/authSlicer';
import useAuth from '@/redux/common/useAuth';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const authState = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    const user = { id: 1, name: 'John Doe' }; // Replace with real login logic
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSendOtp = async () => {
    try {
      await axios.post('/api/otp', { email });
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleSendOtp}>Send OTP</button>
      {authState.isLoggedIn ? <p>Welcome, {authState.user.name}</p> : <p>Please log in.</p>}
    </div>
  );
};

export default LoginComponent;