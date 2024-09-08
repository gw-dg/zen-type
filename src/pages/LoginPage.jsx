// import React from "react";

// export default function LoginPage() {
//   return <div>

//   </div>;

// }
import React, { useState } from "react";
import { UserPlus, LogIn, Github, Eye, EyeOff } from "lucide-react";
import "../components/UI.css"; // Import the CSS file

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Sign Up Section */}
        <div className="sign-up-section">
          <h2 className="auth-title">
            <UserPlus className="icon-margin" /> register
          </h2>
          <form>
            <input type="text" placeholder="username" className="auth-input" />
            <input type="email" placeholder="email" className="auth-input" />
            <input
              type="email"
              placeholder="verify email"
              className="auth-input"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <input
              type="password"
              placeholder="verify password"
              className="auth-input mb-6"
            />
            <button type="submit" className="submit-button">
              <UserPlus className="icon-margin" /> sign up
            </button>
          </form>
        </div>

        {/* Sign In Section */}
        <div className="sign-in-section">
          <h2 className="auth-title">
            <LogIn className="icon-margin" /> login
          </h2>
          <div className="social-login">
            <button className="social-button">Google</button>
            <button className="social-button">
              <Github className="icon-margin" /> GitHub
            </button>
          </div>
          <div className="or-divider">or</div>
          <form>
            <input type="email" placeholder="email" className="auth-input" />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="auth-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="checkbox-margin"
              />
              <label htmlFor="rememberMe">remember me</label>
            </div>
            <button type="submit" className="submit-button">
              <LogIn className="icon-margin" /> sign in
            </button>
          </form>
          <div className="forgot-password">
            <a href="#" className="forgot-link">
              forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
