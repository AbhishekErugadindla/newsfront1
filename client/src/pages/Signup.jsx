import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from "../store";
import { useDispatch } from 'react-redux';
import '../styles/sinup.css';

import PersonIcon from '@mui/icons-material/Person'; // Person icon
import EmailIcon from '@mui/icons-material/Email'; // Email icon
import LockIcon from '@mui/icons-material/Lock'; // Lock icon

const Signup = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://3.110.108.170:5000/api/signup', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error to be caught later
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest();

      if (data) {
        // Signup successful, redirect to login
        dispatch(authActions.signup());
        history("/login");
      } else {
        // Handle signup error here, e.g., display an error message
        console.error('Signup failed');
      }
    } catch (error) {
      // Handle network or other errors here
      console.error(error);
    }
  };

  return (
    <div className='bg'> 
      <form className="sinup" onSubmit={handleSubmit}>
        <Box className="Box"
          width={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius={5}
          marginTop="70px"
        >
          <Typography
            variant="h3"
            style={{
              marginTop: '30px',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </Typography>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            variant="outlined"
            placeholder="Name"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon /> {/* Person icon */}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon /> {/* Email icon */}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon /> {/* Lock icon */}
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: 'black',
              padding: '9px 9px',
              fontSize: '15px',
              marginTop:"30px",
              marginBottom:"20px"
            }}
            variant="contained"
            type="submit"
          >
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
