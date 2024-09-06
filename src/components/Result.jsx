import React from "react";
import Graph from "./Graph";
import "./UI.css";
import Retest from "./Retest";

export default function Result({
  charTyped,
  mistakes,
  rawWpm,
  wpm,
  accuracy,
  data,
}) {
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
      <Retest />
    </>
  );
}
