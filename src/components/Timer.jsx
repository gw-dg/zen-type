import React, { useState, useEffect } from "react";

export default function Timer({ isTestStart }) {
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
  }, [isTestStart]);

  return (
    <div>
      <div className="mode-bar">
        <span>{duration}</span>
        <div>
          <button className="duration-button" onClick={() => setDuration(15)}>
            15s
          </button>
          <button className="duration-button" onClick={() => setDuration(30)}>
            30s
          </button>
          <button className="duration-button" onClick={() => setDuration(60)}>
            60s
          </button>
        </div>
      </div>
    </div>
  );
}
