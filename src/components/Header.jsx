import React from "react";
import { Link } from "react-router-dom";
import { Moon, User } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">
          <Moon className="icon" />
          <span className="logo-text">Zen-Type</span>
        </Link>
      </div>
      <div className="right">
        <Link to="/login" className="icon-link">
          <User className="icon" />
          <span className="sr-only">Profile</span>
        </Link>
      </div>
    </header>
  );
}
