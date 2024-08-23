import React, { useEffect, useState, useRef } from "react";
import { wordList } from "../App";
import "./UI.css";

const genRandom = (wordList) => {
  let s = [];
  let min = 0,
    max = wordList.length - 1;
  for (let i = 0; i < 50; i++) {
    s.push(wordList[Math.floor(Math.random() * (max - min)) + min]);
    if (i != 49) s.push("\u00A0");
  }
  return s;
};

export default function WordDisplay() {
  const [str, setStr] = useState(genRandom(wordList));
  const [currIdx, setCurrIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [charStatus, setCharStatus] = useState([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setCharStatus(str.map((word) => []));
  }, [str]);

  const handleChange = (e) => {
    if (e.key == "Backspace") {
    }
    const typedStr = e.target.value;
    setInputText(typedStr);
    const typedChar = typedStr[typedStr.length - 1];
    const expectedChar = str[currIdx]?.[currCharIdx];

    setCharStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      if (
        (expectedChar === "\u00A0" && typedChar === " ") ||
        typedChar === expectedChar
      ) {
        newStatus[currIdx][currCharIdx] = "correct";
      } else newStatus[currIdx][currCharIdx] = "incorrect";

      return newStatus;
    });
    console.log(typedChar);
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
  };

  return (
    <div>
      <div className="type-box">
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
            className="input-field"
            onChange={handleChange}
            ref={inputRef}
            value={inputText}
          />
        </div>
      </div>
      <div className="stats">
        <p>Mistakes: {mistakes}</p>
      </div>
    </div>
  );
}
