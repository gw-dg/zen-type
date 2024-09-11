import React, { useEffect, useState } from "react";
import { UserPlus, LogIn, Github, Eye, EyeOff } from "lucide-react";
import { Google } from "@mui/icons-material";
import "../components/UI.css"; // Import the CSS file
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import ErrorList from "../utils/ErrorList";
import { Bounce, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setUserName,
}) {
  // const [userName, setUserName] = useState("");
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [verifypasswordRegister, setVerifyPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const authStatus = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate("/");
      }
    });
    return () => authStatus();
  }, [isLoggedIn, navigate]);
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Signed in with Google!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.warning(ErrorList[err.code] || "Please try again", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const handleSubmitRegister = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailRegister || !verifypasswordRegister || !passwordRegister) {
      toast.warning("Fill all the details!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (passwordRegister !== verifypasswordRegister) {
      toast.warning("Password doesn't match!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!emailRegex.test(emailRegister)) {
      toast.warning("Enter a Valid Email ID!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
      .then((res) => {
        setIsLoggedIn(true);
        toast.success("User Created!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        // console.error("Error creating user:", err.message);
        toast.error(ErrorList[err.code] || "some unknown error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  const handleSubmitLogin = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!emailLogin || !passwordLogin) {
      toast.warning("Fill all the details!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!emailRegex.test(emailLogin)) {
      toast.warning("Enter a Valid Email ID", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((res) => {
        setIsLoggedIn(true);
        toast.success("Signed-In", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        // console.error("Error creating user:", err.message);
        toast.error(ErrorList[err.code] || "some unknown error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
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
            placeholder="Enter Username"
            type="text"
            className="login-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
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

        <button className="auth-btn" onClick={(e) => handleGoogleSignIn(e)}>
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
}
