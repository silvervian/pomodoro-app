import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { gear, check, alarm } from "./assets";

// type Timer = {
//   minutes: number;
//   seconds: number;
// };

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialTimer, setInitialTimer] = useState<number>(90);
  const [secondsLeft, setSecondsLeft] = useState<number>(90);
  const [progress, setProgress] = useState<number>(1596);
  // let timerRef = useRef<number | null>(null);

  // const changeSettings = () => {
  //   setIsEditing(!isEditing);
  //   stopTimer();
  // };

  const padNumber = (number: number): string | number => {
    if (!isEditing && number < 10) {
      return "0" + number;
    }
    return number;
  };

  // const handleStartButton = () => {
  //   if (!isRunning && !isEditing) {
  //     startTimer();
  //   } else if (isRunning) {
  //     stopTimer();
  //   }
  // };

  const tikTackToe = (totalSeconds: number) => {
    const tick = 1596 / totalSeconds;
    return tick;
  };
  // setProgress((prev) => prev - tikTackToe(secondsLeft));

  // const stopCountdown = () => {
  //   if (timerRef.current) {
  //     window.clearInterval(timerRef.current);
  //     timerRef.current = null;
  //   }
  // };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const firstTwo = value.replace(/[^0-9]/, "").substring(0, 2);
    // setTimer({ ...timer, [name]: firstTwo });
    // setInitialTimer({ ...initialTimer, [name]: firstTwo });
  };

  const handleChangeSettings = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="app">
      <div className="labels">
        <button className="option-btn active">pomodoro</button>
        <button className="option-btn">short break</button>
        <button className="option-btn">long break</button>
      </div>
      <div className="wrapper">
        <div className="ring">
          <svg width="418" height="468" viewBox="0 0 418 418">
            <circle
              strokeWidth="10px"
              x="0"
              y="y"
              cx="159"
              cy="159"
              r="154"
              strokeLinecap="round"
              strokeDasharray="1596"
              strokeDashoffset={progress}
            />
          </svg>
        </div>

        <div className="timer">
          <div className="time">
            <div className="minutes">40</div>
            <div className="colon">:</div>
            <div className="seconds">30</div>
          </div>
          <button className="start" disabled={isEditing}>
            {isRunning ? "stop" : "start"}
          </button>
          <button className="settings">
            <img src={gear} alt="Settings" onClick={handleChangeSettings} />
          </button>
        </div>
      </div>
      <dialog>test</dialog>
    </div>
  );
}

export default App;
