import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
export default function Dropdown() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user");
  };
  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => handleClick()}>
        <div className="dropdown-btn-items">
          <User size={17} />
          Account
        </div>
      </button>
      <button className="dropdown-btn">
        <div className="dropdown-btn-items">
          <LogOut size={17} />
          Logout
        </div>
      </button>
    </div>
  );
}
