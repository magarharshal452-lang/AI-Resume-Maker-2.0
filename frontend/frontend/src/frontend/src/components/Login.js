import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Paper, Typography } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Paper style={{ padding: 20, maxWidth: 400, margin: 'auto', marginTop: 100 }}>
      <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Login'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>{isSignUp ? 'Sign Up' : 'Login'}</Button>
      </form>
      <Button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Already have an account?' : 'Need an account?'}</Button>
    </Paper>
  );
}

export default Login;
