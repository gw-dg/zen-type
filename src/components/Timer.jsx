import React, { useState, useEffect } from "react";
import genRandom from "../utils/GenRandom";
import { wordList } from "../App";

export default function Timer({
  isTestStart,
  setTestStart,
  setStr,
  isTestEnd,
}) {
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    if (isTestStart) {
      if (duration > 0) {
        const ID = setInterval(
          () => setDuration((duration) => duration - 1),
          1000
        );
        return () => clearInterval(ID);
      }
    }
  }, [isTestStart, duration]);

  const handleClick = (dura) => {
    if (setTestStart) {
      setTestStart(false);
      setStr(genRandom(wordList));
    }
    setDuration(dura);
  };
  return (
    <div>
      <div className="mode-bar">
        <span>{duration}</span>
        <div>
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
