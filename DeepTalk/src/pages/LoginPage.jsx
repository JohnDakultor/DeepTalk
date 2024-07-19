import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../services/Authentication";

// import { useDispatch, useSelector } from "react-redux";
// import { setIsFetching, loginSuccess, loginFailure } from "../redux/userSlice";
import authService from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  // const dispatch = useDispatch();
  // const isFetching = useSelector((state) => state.user.isFetching);
  // const error = useSelector((state) => state.user.error);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginEmail(e.target.value)
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setLoginPassword(e.target.value)
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const isPasswordValid = (password) => {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const login = () => {
    Axios({
        method: "POST",
        data: {
            email: email,
            password: password,
        },
        withCredentials: true,
        url: "http://localhost:3001/login",
    }).then((res) => {
            if(res.data.auth === true){
                setLoginStatus(true)
                localStorage.setItem('jwt', res.data.token) // Save JWT in local storage
                auth.login(res.data.result); // Log in with user sent from Express
                navigate('/productui', {replace: true});
            }else {
                setLoginStatus(false);
            }

        }

    ).catch((err)=>{console.log(err)});
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isEmailValid(email)) {
      setErrorMessage("Invalid Email");
      return;
  }

  
};

  // Function to handle OAuth login
  const handleOAuthLogin = (provider) => {
    // Implement OAuth login logic using the specified provider
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          mt: 10,
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPasswordClick} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
            >
              Login
            </Button>

            {errorMessage && (
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            )}

            <Box
              sx={{
                mt: 2,
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Divider sx={{ width: "45%" }} />
              <Typography variant="body1" sx={{ mx: 2 }}>
                or
              </Typography>
              <Divider sx={{ width: "45%" }} />
            </Box>

            <Button
              startIcon={<FacebookIcon />}
              onClick={() => handleOAuthLogin("Facebook")}
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#1877f2", color: "#fff" }}
            >
              Login with Facebook
            </Button>
            <Button
              startIcon={<GoogleIcon />}
              onClick={() => handleOAuthLogin("Google")}
              fullWidth
              variant="contained"
              sx={{ mt: 1, bgcolor: "#DB4437", color: "#fff" }}
            >
              Login with Google
            </Button>
            <Button
              startIcon={<XIcon />}
              onClick={() => handleOAuthLogin("Twitter")}
              fullWidth
              variant="contained"
              sx={{ mt: 1, bgcolor: "#1DA1F2", color: "#fff" }}
            >
              Login with X
            </Button>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
