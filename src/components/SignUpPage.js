// SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
        fullName
      };

      // Check if the email already exists
      const response = await axios.get('http://localhost:5000/users', {
        params: { email }
      });

      if (response.data.length > 0) {
        setErrorMessage('Email already exists. Please try logging in.');
      } else {
        // Add new user to the database
        await axios.post('http://localhost:5000/users', newUser);
        alert('Signup successful');
        navigate('/'); // Redirect to login page after sign-up
      }
    } catch (error) {
      setErrorMessage('Error during sign-up process');
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</Typography>

      <form onSubmit={handleSignUp}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ marginBottom: '20px' }}
        />
        
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
        
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
      </form>
    </Paper>
  );
};

export default SignUpPage;
