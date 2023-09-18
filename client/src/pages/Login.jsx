import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, InputAdornment } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import "../styles/login.css";

import EmailIcon from '@mui/icons-material/Email'; // Email icon
import LockIcon from "@mui/icons-material/Lock"; // Lock icon

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://3.110.108.170:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        if (data) {
          const user = data.user;
          if (user.isVerified) {
            dispatch(authActions.login({ username: user.email }));
            history("/");
          } else {
            console.log("Email not verified. Please verify your email.");
            // You can display a message to the user here if needed.
          }
        } else {
          console.error("Authentication failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <Box
          className="Box"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          marginTop="100px"
          borderRadius={5}
        >
          <Typography
            variant="h3"
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
          <TextField
            className="login-input"
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
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
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "black",
              padding: "9px 9px",
              fontSize: "15px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
          <Typography
            variant="p"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            If not registered, please{" "}
            <Link component="button" onClick={() => history("/signup")}>
              Sign up
            </Link>{" "}
            first
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;
