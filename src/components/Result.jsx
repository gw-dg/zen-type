import React from "react";
import Graph from "./Graph";
import "./UI.css";
import { RefreshCcw } from "lucide-react";

export default function Result({
  charTyped,
  setCharTyped,
  mistakes,
  setMistakes,
  rawWpm,
  setRawWpm,
  wpm,
  setWpm,
  accuracy,
  setAccuracy,
  testEnd,
  setTestEnd,
  data,
  setData,
  resetTrigger,
  setResetTrigger,
}) {
  const handleClick = () => {
    setCharTyped(0);
    setMistakes(0);
    setRawWpm(0);
    setWpm(0);
    setAccuracy(0);
    setData([[], [], []]);
    setTestEnd(false);
    setResetTrigger((prev) => prev + 1);
  };
  return (
    <>
      <div className="result-box">
        <div className="result">
          <span>WPM</span>
          <span className="result-value">{Math.floor(wpm)}</span>
          <span>Raw WPM</span>
          <span className="result-value">{Math.floor(rawWpm)}</span>
          <span>Accuracy</span>
          <span className="result-value">
            {Math.floor(accuracy * 100) + "%"}
          </span>
        </div>
        <Graph data={data} />
      </div>
      <button className="retest-result" onClick={() => handleClick()}>
        <RefreshCcw className="retest-btn-icon" />
      </button>
    </>
  );
}
