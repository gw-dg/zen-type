import React, { useState, useRef, useEffect } from "react";
import WordDisplay from "./WordDisplay";
import { MousePointer2 } from "lucide-react";
export default function Focus({
  rawWpm,
  setRawWpm,
  wpm,
  setWpm,
  setAccuracy,
  testEnd,
  setTestEnd,
  charTyped,
  setCharTyped,
  mistakes,
  setMistakes,
}) {
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
  useEffect(() => {
    focusInput();
  }, []);
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
      {isTestActive && showModal ? (
        <>
          <div className="modal">
            <h1 className="modal-text">
              <MousePointer2 />
              {"\u00A0"}
              <p> Click here to focus</p>
            </h1>
          </div>
          <WordDisplay
            inputRef={inputRef}
            focusInput={focusInput}
            rawWpm={rawWpm}
            setRawWpm={setRawWpm}
            wpm={wpm}
            setWpm={setWpm}
            setAccuracy={setAccuracy}
            testEnd={testEnd}
            setTestEnd={setTestEnd}
            charTyped={charTyped}
            setCharTyped={setCharTyped}
            mistakes={mistakes}
            setMistakes={setMistakes}
          />
        </>
      ) : (
        <WordDisplay
          inputRef={inputRef}
          focusInput={focusInput}
          rawWpm={rawWpm}
          setRawWpm={setRawWpm}
          wpm={wpm}
          setWpm={setWpm}
          setAccuracy={setAccuracy}
          testEnd={testEnd}
          setTestEnd={setTestEnd}
          charTyped={charTyped}
          setCharTyped={setCharTyped}
          mistakes={mistakes}
          setMistakes={setMistakes}
        />
      )}
    </div>
  );
}
