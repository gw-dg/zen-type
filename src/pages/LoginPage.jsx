import React, { useState } from "react";
import { UserPlus, LogIn, Github, Eye, EyeOff } from "lucide-react";
import { Google } from "@mui/icons-material";
import "../components/UI.css"; // Import the CSS file

const LoginPage = () => {
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
          />
          <div className="password-field">
            <input
              placeholder="Enter Password"
              type={showPasswordSignUp ? "text" : "password"}
              className="login-input"
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
          <button className="auth-btn">
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
          />
          <div className="password-field">
            <input
              placeholder="Enter Password"
              type={showPasswordSignIn ? "text" : "password"}
              className="login-input"
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
        <button className="auth-btn">
          <LogIn /> login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
