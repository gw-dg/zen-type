import React from "react";
import Result from "../components/Result";
import Focus from "../components/Focus";
import "../App.css";
export default function HomePage({
  wpm,
  setWpm,
  rawWpm,
  setRawWpm,
  accuracy,
  setAccuracy,
  charTyped,
  setCharTyped,
  mistakes,
  setMistakes,
  testEnd,
  setTestEnd,
  data,
  setData,
  resetTrigger,
  setResetTrigger,
}) {
  return (
    <div>
      {testEnd ? (
        <Result
          charTyped={charTyped}
          setCharTyped={setCharTyped}
          mistakes={mistakes}
          setMistakes={setMistakes}
          rawWpm={rawWpm}
          setRawWpm={setRawWpm}
          wpm={wpm}
          setWpm={setWpm}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          testEnd={testEnd}
          setTestEnd={setTestEnd}
          data={data}
          setData={setData}
          resetTrigger={resetTrigger}
          setResetTrigger={setResetTrigger}
        />
      ) : (
        <Focus
          rawWpm={rawWpm}
          setRawWpm={setRawWpm}
          wpm={wpm}
          setWpm={setWpm}
          setAccuracy={setAccuracy}
          testEnd={testEnd}
          setTestEnd={setTestEnd}
          charTyped={charTyped}
          setCharTyped={setCharTyped}
          mistakes={mistakes}
          setMistakes={setMistakes}
          setData={setData}
          resetTrigger={resetTrigger}
          setResetTrigger={setResetTrigger}
        />
      )}
    </div>
  );
}
