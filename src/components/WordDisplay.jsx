import React, { useEffect, useState, useRef } from "react";
import genRandom from "../utils/GenRandom";
import { wordList } from "../App";
import "./UI.css";
import Timer from "./Timer";
import { RefreshCcw } from "lucide-react";

export default function WordDisplay({
  inputRef,
  focusInput,
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
  setData,
  resetTrigger,
  setResetTrigger,
}) {
  //{ testEnd, setTestEnd }) {
  const [str, setStr] = useState(genRandom(wordList));
  const [currIdx, setCurrIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const [charStatus, setCharStatus] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTestStart, setTestStart] = useState(false);
  const [mode, setMode] = useState(15);
  const [duration, setDuration] = useState(15);
  // const [data, setData] = useState([[], [], []]);

  const handleRetest = () => {
    setResetTrigger((resetTrigger) => resetTrigger + 1);
  };

  useEffect(() => {
    // if (setStr) {
    const newStr = genRandom(wordList);
    // }
    setStr(newStr);
    setCurrIdx(0);
    setCurrCharIdx(0);
    setInputText("");
    setTestStart(false);
    setCharStatus([]);
    // setCharStatus(newStr.map((word) => []));
    //------------------------
    setRawWpm(0);
    setWpm(0);
    setAccuracy(0);
    setTestEnd(false);
    setCharTyped(0);
    setMistakes(0);
    setDuration(mode);
    setData([[], [], []]);
  }, [resetTrigger, testEnd]);

  useEffect(() => {
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
    setCharStatus(str.map((word) => []));
  }, [str]);

  const handleClick = () => focusInput();
  window.addEventListener("click", handleClick);
  const handleBackspace = (e) => {
    handleClick();
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default backspace behavior

      if (currIdx === 0 && currCharIdx === 0) {
        return; // Do nothing if at the very beginning
      }

      setCharStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        if (currCharIdx === 0) {
          // If at the beginning of a word, move to the previous word
          newStatus[currIdx - 1][str[currIdx - 1].length - 1] = "";
        } else {
          newStatus[currIdx][currCharIdx - 1] = "";
        }
        return newStatus;
      });

      if (currCharIdx === 0) {
        // Move to the end of the previous word
        setCurrIdx((prevIdx) => prevIdx - 1);
        setCurrCharIdx(str[currIdx - 1].length - 1);
      } else {
        setCurrCharIdx((prevIdx) => prevIdx - 1);
      }

      // Update input text
      setInputText((prevText) => prevText.slice(0, -1));
    }
  };
  const handleChange = (e) => {
    const typedStr = e.target.value;
    handleClick();
    if (typedStr.length > 0 && isTestStart !== true) {
      setTestStart(true);
    }
    setInputText(typedStr);
    const typedChar = typedStr[typedStr.length - 1];
    const expectedChar = str[currIdx]?.[currCharIdx];

    setCharStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      if (newStatus[currIdx])
        if (
          (expectedChar === "\u00A0" && typedChar === " ") ||
          typedChar === expectedChar
        ) {
          newStatus[currIdx][currCharIdx] = "correct";
        } else newStatus[currIdx][currCharIdx] = "incorrect";

      return newStatus;
    });
    // console.log(typedChar);
    if (expectedChar === "\u00A0" && typedChar === " ") {
      if (currCharIdx + 1 === str[currIdx]?.length) {
        setCurrCharIdx(0);
        setCurrIdx((prevIdx) => prevIdx + 1);
      } else {
        setCurrCharIdx((prevIdx) => prevIdx + 1);
      }
    } else if (typedChar === expectedChar) {
      if (currCharIdx + 1 === str[currIdx]?.length) {
        setCurrCharIdx(0);
        setCurrIdx((prevIdx) => prevIdx + 1);
      } else {
        setCurrCharIdx((prevIdx) => prevIdx + 1);
      }
    } else {
      setMistakes((prevMistakes) => prevMistakes + 1);
      if (currCharIdx + 1 === str[currIdx]?.length) {
        setCurrCharIdx(0);
        setCurrIdx((prevIdx) => prevIdx + 1);
      } else {
        setCurrCharIdx((prevIdx) => prevIdx + 1);
      }
    }
    setCharTyped((charTyped) => charTyped + 1);
    if (currIdx === str.length - 1 && currCharIdx === str[currIdx].length - 1) {
      setTestEnd(true);
      // setWpm((wpm) => );
    }
  };

  return (
    <div className="type-box">
      {isTestStart ? (
        <Timer
          isTestStart={isTestStart}
          setTestStart={setTestStart}
          // str={str}
          setStr={setStr}
          setTestEnd={setTestEnd}
          mode={mode}
          setMode={setMode}
          charTyped={charTyped}
          mistakes={mistakes}
          wpm={wpm}
          setWpm={setWpm}
          rawWpm={rawWpm}
          setRawWpm={setRawWpm}
          setAccuracy={setAccuracy}
          setData={setData}
          duration={duration}
          setDuration={setDuration}
          setResetTrigger={setResetTrigger}
        />
      ) : (
        <Timer
          setMode={setMode}
          duration={duration}
          setDuration={setDuration}
        />
      )}
      {/* <div className="empty-space"></div> */}
      <div className="word-box">
        {str.map((word, wordIndex) => (
          <span key={wordIndex}>
            {[...word].map((char, charIndex) => {
              const isCurrentChar =
                wordIndex === currIdx && charIndex === currCharIdx;
              const status = charStatus[wordIndex]?.[charIndex];
              return (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className={`char ${isCurrentChar ? "current-char" : ""} ${
                    status ? `${status}-char` : ""
                  }`}>
                  {char}
                </span>
              );
            })}
          </span>
        ))}
        <input
          type="text"
          value={inputText}
          className="input-field"
          onChange={handleChange}
          onKeyDown={handleBackspace}
          ref={inputRef}
          disabled={testEnd}
        />
      </div>
      <div>
        <button className="retest-btn" onClick={() => handleRetest()}>
          <RefreshCcw className="retest-btn-icon" />
        </button>
      </div>
    </div>
  );
}
