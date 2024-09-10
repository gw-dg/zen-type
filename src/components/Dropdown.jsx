import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
export default function Dropdown({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user");
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(ErrorList[err.code] || "Can't log out", {
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
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => handleClick()}>
        <div className="dropdown-btn-items">
          <User size={17} />
          Account
        </div>
      </button>
      <button className="dropdown-btn" onClick={() => handleSignOut()}>
        <div className="dropdown-btn-items">
          <LogOut size={17} />
          Logout
        </div>
      </button>
    </div>
  );
}
