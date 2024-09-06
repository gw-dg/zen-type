import React from "react";
import { RefreshCcw } from "lucide-react";
import "./UI.css";
import genRandom from "../utils/GenRandom";
import { wordList } from "../App";

export default function Retest({ setStr }) {
  const handleClick = () => {
    if (setStr) {
      setStr(genRandom(wordList));
    }
  };
  return (
    <div>
      <button className="retest-btn" onClick={() => handleClick()}>
        <RefreshCcw />
      </button>
    </div>
  );
}
