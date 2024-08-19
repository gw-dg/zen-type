import React, { useEffect, useState, useRef } from "react";
import { wordList } from "../App";
import "./UI.css";

const genRandom = (wordList) => {
  let words = [];
  for (let i = 0; i < 50; i++) {
    words.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  return words;
};

const Caret = ({ position }) => (
  <span
    style={{
      position: "absolute",
      // left: `${position.left}px`,
      // top: `${position.top}px`,
      // width: "2px",
      // height: "35px",
      // backgroundColor: "blue",
      // animation: "blink 1s step-end infinite",
    }}
  />
);

export default function WordDisplay() {
  const [words, setWords] = useState(() => genRandom(wordList));
  const [currIdx, setCurrIdx] = useState(0);
  const [inputText, setInputText] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [wordStatus, setWordStatus] = useState(
    words.map(() => ({ correct: true, completed: false }))
  );
  const [caretPosition, setCaretPosition] = useState({ left: 0, top: 0 });
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [testEnded, setTestEnded] = useState(false);

  const inputRef = useRef(null);
  const wordBoxRef = useRef(null);
  const allWordsRef = useRef(words.join(" "));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const currentChar = document.querySelector(".current-char");
    if (currentChar && wordBoxRef.current) {
      const rect = currentChar.getBoundingClientRect();
      const containerRect = wordBoxRef.current.getBoundingClientRect();
      setCaretPosition({
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
      });
    }
  }, [currIdx]);

  useEffect(() => {
    if (inputText.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
  }, [inputText]);

  useEffect(() => {
    if (startTime && !testEnded) {
      const interval = setInterval(() => {
        setWpm(calculateWPM());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, testEnded]);

  const calculateWPM = () => {
    if (!startTime) return 0;

    const currentTime = Date.now();
    const timeElapsed = (currentTime - startTime) / 60000; // Convert to minutes
    const wordsTyped = inputText.trim().split(/\s+/).length;

    return Math.round(wordsTyped / timeElapsed);
  };

  const handleKeyDown = (e) => {
    if (testEnded) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      handleBackspace();
    } else if (e.key.length === 1) {
      handleCharInput(e.key);
    }
  };

  const handleBackspace = () => {
    if (currIdx > 0) {
      setCurrIdx((prev) => prev - 1);
      setInputText((prev) => prev.slice(0, -1));

      const wordIndex =
        allWordsRef.current.slice(0, currIdx - 1).split(" ").length - 1;

      setWordStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        if (wordIndex >= 0 && wordIndex < newStatus.length) {
          newStatus[wordIndex].correct = true;
          newStatus[wordIndex].completed = false;
        }
        return newStatus;
      });
    }
  };

  const handleCharInput = (char) => {
    if (currIdx >= allWordsRef.current.length) {
      endTest();
      return;
    }

    const expectedChar = allWordsRef.current[currIdx];

    setWordStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      const wordIndex =
        allWordsRef.current.slice(0, currIdx).split(" ").length - 1;

      if (wordIndex >= 0 && wordIndex < newStatus.length) {
        if (char !== expectedChar) {
          newStatus[wordIndex].correct = false;
          setMistakes((prev) => prev + 1);
        }
        if (expectedChar === " ") {
          newStatus[wordIndex].completed = true;
        }
      }
      return newStatus;
    });

    setCurrIdx((prev) => prev + 1);
    setInputText((prev) => prev + char);

    if (currIdx + 1 >= allWordsRef.current.length) {
      endTest();
    }
  };

  const endTest = () => {
    setTestEnded(true);
    setWpm(calculateWPM());
  };

  const getCharClassName = (wordIndex, charIndex, char) => {
    const globalCharIndex =
      allWordsRef.current.indexOf(words[wordIndex]) + charIndex;

    if (globalCharIndex < currIdx) {
      return inputText[globalCharIndex] === char
        ? "correct-char"
        : "incorrect-char";
    } else if (globalCharIndex === currIdx) {
      return "current-char";
    }
    return "";
  };

  const resetTest = () => {
    const newWords = genRandom(wordList);
    setWords(newWords);
    allWordsRef.current = newWords.join(" ");
    setInputText("");
    setCurrIdx(0);
    setMistakes(0);
    setWordStatus(newWords.map(() => ({ correct: true, completed: false })));
    setStartTime(null);
    setWpm(0);
    setTestEnded(false);
  };

  return (
    <div>
      <div className="type-box">
        <div className="word-box" ref={wordBoxRef}>
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className={`word ${
                wordStatus[wordIndex].completed && wordStatus[wordIndex].correct
                  ? "correct-word"
                  : ""
              }`}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className={`char ${getCharClassName(
                    wordIndex,
                    charIndex,
                    char
                  )}`}>
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="char">&nbsp;</span>
              )}
            </span>
          ))}
          {!testEnded && <Caret position={caretPosition} />}
        </div>
        <input
          type="text"
          className="input-field"
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={inputText}
          readOnly
        />
      </div>
      <div className="stats">
        <p>Mistakes: {mistakes}</p>
        <p>WPM: {wpm}</p>
        {testEnded && <p>Test Completed!</p>}
      </div>
      <button onClick={resetTest}>Reset Test</button>
    </div>
  );
}
