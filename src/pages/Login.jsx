// src/pages/Login.jsx
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { loginWithGoogle } from "../firebase/auth";

const Login = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Job Application Tracker
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please login with Google to continue
      </Typography>

      <Button variant="contained" onClick={loginWithGoogle}>
        Login with Google
      </Button>
    </Box>
  );
};

export default Login;
