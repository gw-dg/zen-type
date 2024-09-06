import React, { useState, useEffect } from "react";
import genRandom from "../utils/GenRandom";
import { wordList } from "../App";

export default function Timer({
  isTestStart,
  setTestStart,
  setStr,
  setTestEnd,
  mode,
  setMode,
  charTyped,
  mistakes,
  wpm,
  setWpm,
  rawWpm,
  setRawWpm,
  setAccuracy,
  setData,
}) {
  const [duration, setDuration] = useState(15);

  // const [mode, setMode] = useState(15);

  const calcWpm = () => {
    let minutes = (mode - duration + 1) / 60;
    let rWpm = charTyped / 5;
    if (minutes !== 0) rWpm = rWpm / minutes;
    setRawWpm(rWpm);
    let accuracy = (charTyped - mistakes) / charTyped;
    let aWpm = Math.floor(rWpm * accuracy);
    setWpm(aWpm);
    setAccuracy(accuracy);
    setData((prev) => [
      [...prev[0], mode - duration + 1],
      [...prev[1], wpm],
      [...prev[2], rawWpm],
    ]);
  };

  useEffect(() => {
    if (isTestStart) {
      if (duration > 0) {
        const ID = setInterval(
          () => setDuration((duration) => duration - 1),
          1000
        );
        calcWpm();
        return () => clearInterval(ID);
      } else {
        setTestStart(false);
        setTestEnd(true);
      }
    }
  }, [isTestStart, duration]);

  const handleClick = (dura) => {
    if (setTestStart) {
      setTestStart(false);
      setStr(genRandom(wordList));
    }
    setDuration(dura);
    setMode(dura);
  };
  return (
    <div>
      <div className="mode-bar">
        <span className="duration">{duration}</span>
        <div className="buttons">
          <button className="duration-button" onClick={() => handleClick(15)}>
            15s
          </button>
          <button className="duration-button" onClick={() => handleClick(30)}>
            30s
          </button>
          <button className="duration-button" onClick={() => handleClick(60)}>
            60s
          </button>
        </div>
      </div>
    </div>
  );
}
