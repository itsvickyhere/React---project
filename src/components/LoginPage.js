// LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: {
          email,
          password
        }
      });

      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert('Login successful');
        navigate('/home');  // Redirect to home page after login
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('Error during login process');
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>Login</Typography>

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: '20px' }}
        />
        
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '20px' }}
        />

        {errorMessage && (
          <Typography color="error" style={{ marginBottom: '20px' }}>{errorMessage}</Typography>
        )}
        
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>

      <Typography style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </Typography>
    </Paper>
  );
};

export default LoginPage;
