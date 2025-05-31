import React, { useState } from "react";
import { Container, Box, Button, TextField, Typography, Paper, Link, InputAdornment, IconButton, Checkbox, FormControlLabel, Avatar } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, AccountCircle } from "@mui/icons-material";
import Circle from "../components/Circle";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  }

  return (
    <Container maxWidth="lg" sx={{ maxHeight: "100vh" }}>
      <Circle position={"fixed"} top={"78%"} right={"86%"} borderRadius={50} bgColor={"#ffc0cb7a"} />
      <Circle position={"fixed"} bottom={"65%"} left={"88%"} borderRadius={50} bgColor={"#2196f37a"} />
      <Box
        sx={{
          display: "flex",
          position: "absolute", 
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                width: 56,
                height: 56,
              }}
            >
              <AccountCircle fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link href="#" variant="body2" color="primary" underline="hover">
                Forgot password?
              </Link>
            </Box>

            {/* Sign In Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 3,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                },
              }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
                        
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
