import React, { useState } from "react";
import { UserPlus, LogIn, Github, Eye, EyeOff } from "lucide-react";
import { Google } from "@mui/icons-material";
import "../components/UI.css"; // Import the CSS file
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginPage = () => {
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [verifypasswordRegister, setVerifyPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleSubmitRegister = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailRegister || !verifypasswordRegister || !passwordRegister) {
      alert("fill all details");
      return;
    }
    if (passwordRegister !== verifypasswordRegister) {
      alert("password doesn't match");
      return;
    }
    if (!emailRegex.test(emailRegister)) {
      alert("enter a valid email id");
      return;
    }
    createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
      .then((res) => {
        alert("user created");
      })
      .catch((err) => {
        console.error("Error creating user:", err.message);
        alert("not able to create user");
      });
  };
  const handleSubmitLogin = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailLogin || !passwordLogin) {
      alert("fill all details");
      return;
    }
    if (!emailRegex.test(emailLogin)) {
      alert("enter a valid email id");
      return;
    }
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((res) => {
        alert("signed-in");
      })
      .catch((err) => {
        console.error("Error creating user:", err.message);
        alert("not able to sign-in");
      });
  };
  return (
    <div className="login-box">
      <div className="signup-box">
        <div className="heading-field">
          <UserPlus className="register-login-heading" />
          <h1 className="register-login-heading">register</h1>
        </div>
        <form className="signup-form">
          <input
            placeholder="Enter Email"
            type="text"
            className="login-input"
            value={emailRegister}
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <div className="password-field">
            <input
              placeholder="Enter Password"
              type={showPasswordSignUp ? "text" : "password"}
              className="login-input"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
            <button
              type="button" // Prevent form submission
              className="show-password-icon"
              onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}>
              {showPasswordSignUp ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </button>
          </div>
          <div className="password-field">
            <input
              placeholder="Verify Password"
              type={showVerifyPassword ? "text" : "password"}
              className="login-input"
              value={verifypasswordRegister}
              onChange={(e) => setVerifyPasswordRegister(e.target.value)}
            />
            <button
              type="button" // Prevent form submission
              className="show-password-icon"
              onClick={() => setShowVerifyPassword(!showVerifyPassword)}>
              {showVerifyPassword ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </button>
          </div>
          <button className="auth-btn" onClick={(e) => handleSubmitRegister(e)}>
            <UserPlus /> register
          </button>
        </form>
      </div>
      <div className="signup-box">
        <div className="heading-field">
          <h1 className="register-login-heading">
            <LogIn />
            login
          </h1>
        </div>

        <button className="auth-btn">
          <Google /> Sign-In with Google
        </button>
        <div className="empty-line"></div>
        <form className="signup-form">
          <input
            placeholder="Enter Email"
            type="text"
            className="login-input"
            value={emailLogin}
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
          />
          <div className="password-field">
            <input
              placeholder="Enter Password"
              type={showPasswordSignIn ? "text" : "password"}
              className="login-input"
              value={passwordLogin}
              onChange={(e) => {
                setPasswordLogin(e.target.value);
              }}
            />
            <button
              type="button" // Prevent form submission
              className="show-password-icon"
              onClick={() => setShowPasswordSignIn(!showPasswordSignIn)}>
              {showPasswordSignIn ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </button>
          </div>
        </form>
        <div className="checkbox-field">
          <input type="checkbox" />
          <p className="checkbox-text">Remember Me</p>
        </div>
        <button
          className="auth-btn"
          onClick={(e) => {
            handleSubmitLogin(e);
          }}>
          <LogIn /> login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
