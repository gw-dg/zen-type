import React from "react";
import "./UI.css";

export default function Result({ rawWpm, wpm, accuracy }) {
  return (
    <div>
      <div className="Result">
        <span>WPM : {wpm}</span>
        <span>Raw WPM: {rawWpm}</span>
        <span>Accuracy : {accuracy * 100}</span>
      </div>
    </div>
  );
}
