import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, User } from "lucide-react";
import "./Header.css";
import Dropdown from "./Dropdown";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">
          <Moon className="icon" />
          <span className="logo-text">Zen-Type</span>
        </Link>
      </div>
      <div
        className="right"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "relative" }}>
        {!isLoggedIn ? (
          <Link to="/login" className="icon-link">
            <User className="icon" />
            <span className="sr-only">Profile</span>
          </Link>
        ) : (
          <div>
            <Link to="/user" className="icon-link">
              <User className="icon" />
              <span className="sr-only">Profile</span>
            </Link>
            {isHovered ? <Dropdown /> : <></>}
          </div>
        )}
      </div>
    </header>
  );
}
