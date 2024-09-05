import React, { useState, useRef } from "react";
import WordDisplay from "./WordDisplay";
export default function Focus() {
  const inputRef = useRef(null);
  const [isTestActive, setTestActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  // const [isBlur, setBlur] = useState(false);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleBlur = () => {
    setShowModal(true);
    setTestActive(false);
  };
  const handleClick = () => {
    focusInput();
    setShowModal(false);
    setTestActive(true);
  };
  window.addEventListener("click", handleClick);
  window.addEventListener("blur", handleBlur);

  return (
    <div>
      {showModal ? (
        <div className="modal">PRESS ANY KEY TO FOCUS</div>
      ) : (
        <WordDisplay inputRef={inputRef} focusInput={focusInput} />
      )}
    </div>
  );
}
