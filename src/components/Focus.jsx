import React, { useEffect, useState, useRef } from "react";
import WordDisplay from "./WordDisplay";
export default function Focus() {
  const inputRef = useRef(null);
  const [isTestActive, setTestActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  const updateLastInteraction = () => {
    setLastInteractionTime(Date.now());
    // console.log(lastInteractionTime);
    setTestActive(true);
    setShowModal(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  useEffect(() => {
    const check = setInterval(() => {
      const currTime = Date.now();
      if (currTime - lastInteractionTime > 70000) {
        setTestActive(false);
        setShowModal(true);
      }
    }, 1000);

    return () => clearInterval(check);
  }, [lastInteractionTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        e.preventDefault();
        updateLastInteraction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);
  return (
    <div>
      {showModal ? (
        <div className="modal">PRESS ANY KEY TO FOCUS</div>
      ) : (
        <WordDisplay
          onInteraction={updateLastInteraction}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}
