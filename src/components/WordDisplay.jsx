import React, { useEffect, useState, useRef } from "react";
import { wordList } from "../App";
import "./UI.css";

const genRandom = (wordList) => {
  let s = [];
  let min = 0,
    max = wordList.length - 1;
  for (let i = 0; i < 50; i++) {
    s.push(wordList[Math.floor(Math.random() * (max - min)) + min]);
  }
  return s;
};

export default function WordDisplay() {
  const [str, setStr] = useState(genRandom(wordList));
  const [currIdx, setCurrIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const [inputText, setInputText] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [charStatus, setCharStatus] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setCharStatus(str.map((word) => Array(word.length).fill(null)));
  }, [str]);

  const handleChange = (e) => {
    const typedStr = e.target.value;
    const typedWords = typedStr.split(" ");
    const lastTypedWord = typedWords[typedWords.length - 1];
    const typedChar = lastTypedWord[lastTypedWord.length - 1];
    const expectedChar = str[currIdx]?.[currCharIdx];

    setCharStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      if (!newStatus[currIdx]) newStatus[currIdx] = [];
      newStatus[currIdx][currCharIdx] =
        typedChar === expectedChar ? "correct" : "incorrect";
      return newStatus;
    });

    if (typedChar === expectedChar) {
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
    setInputText(typedStr);
  };

  const getWordClass = (wordIndex) => {
    if (wordIndex >= currIdx) return "";
    const wordStatus = charStatus[wordIndex];
    if (wordStatus && wordStatus.every((status) => status === "correct")) {
      return "typed-word-correct";
    }
    return "typed-word-wrong";
  };

  return (
    <div>
      <div className="type-box">
        <div className="word-box">
          {str.map((word, wordIndex) => (
            <span key={wordIndex} className={getWordClass(wordIndex)}>
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
              <span className="space">&nbsp;</span>
            </span>
          ))}
          <input
            type="text"
            className="input-field"
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      </div>
      <div className="stats">
        <p>Mistakes: {mistakes}</p>
      </div>
    </div>
  );
}
