import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { FormControl, TextField, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import signUpImage from "../assets/images/signUpImage.svg";

import "./SignUpPage.css";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, contain at least 1 letter, 1 number, and 1 special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/ChattingPage");
      })
      .catch((error) => {
        console.log("login failed: ", error);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleBackPage = () => {
    navigate("/LoginPage");
  };

  return (
    <div className="app">
      <div className="app_body1">
        <div className="SignUp">
          <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <Box sx={{ m: 1 }}>
                <FormControl
                  sx={{
                    m: 1,
                    width: "25ch",
                    "& input": {
                      color: (theme) =>
                        emailError ? theme.palette.error.main : "grey",
                      borderColor: (theme) =>
                        emailError ? theme.palette.error.main : "grey",
                    },
                  }}
                  error={!!emailError}
                  variant="standard"
                  color="success"
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(""); // Clear error on input change
                    }}
                  />
                  <FormHelperText>{emailError}</FormHelperText>
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,
                    width: "25ch",
                    "& input": {
                      color: (theme) =>
                        passwordError ? theme.palette.error.main : "grey",
                      borderColor: (theme) =>
                        passwordError ? theme.palette.error.main : "grey",
                    },
                  }}
                  error={!!passwordError}
                  variant="standard"
                  color="success"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(""); // Clear error on input change
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{passwordError}</FormHelperText>
                </FormControl>
              </Box>
              <button type="submit">SignUp</button>
            </form>
            <button type="text" onClick={handleBackPage}>
              Already have an account?
            </button>
          </div>
        </div>
        <div className="image_container">
          <img src={signUpImage} alt="signup" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
