import React from "react";
import Graph from "./Graph";
import "./UI.css";

export default function Result({ rawWpm, wpm, accuracy }) {
  return (
    <div className="result-box">
      <div className="result">
        <span>WPM</span>
        <span className="result-value">{wpm}</span>
        <span>Raw WPM</span>
        <span className="result-value">{rawWpm}</span>
        <span>Accuracy</span>
        <span className="result-value">{accuracy * 100}</span>
      </div>
      <Graph />
    </div>
  );
}
