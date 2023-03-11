import React, { useEffect, useState } from "react";
import "./App.css";

import { gear, check, alarm } from "./assets";

type Timer = {
  minutes: number;
  seconds: number;
};

const initialValues = { minutes: 1, seconds: 10 };

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialTimer, setInitialTimer] = useState<Timer>(initialValues);
  const [timer, setTimer] = useState<Timer>(initialValues);

  const timerInterval: NodeJS.Timer | null = null;

  const changeSettings = () => {
    setIsEditing(!isEditing);
  };

  const padNumber = (number: number): string | number => {
    if (!isEditing && number < 10) {
      return "0" + number;
    }
    return number;
  };

  const handleStartButton = () => {
    if (!isRunning && !isEditing) {
      startTimer();
    } else if (isRunning) {
      stopTimer();
    }
  };

  const tikTackToe = () => {
    // 1596 = 100%
    // 70s = 100%
    // 1596 / 70 = 22,8 ~ 23
    // oneTik = 23
  };

  const startTimer = () => {
    setIsRunning(true);
    const totalSeconds = timer.minutes * 60 + timer.seconds;
    const startTime = +new Date();
    const timerInterval = setInterval(() => {
      const currentTime = +new Date();
      const diff = currentTime - startTime;
      const secondsLeft = totalSeconds - Math.floor(diff / 1000);
      const minutesLeft = Math.floor(secondsLeft / 60);
      setTimer({ minutes: minutesLeft, seconds: secondsLeft % 60 });
      if (secondsLeft <= 0) {
        finishTimer();
        clearInterval(timerInterval);
      }
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    // clearInterval(timerInterval);
  };

  const finishTimer = () => {
    setIsRunning(false);
    new Audio(alarm).play();
    setTimer(initialTimer);
    // clearInterval(timerInterval);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const firstTwo = value.replace(/[^0-9]/, "").substring(0, 2);
    setTimer({ ...timer, [name]: firstTwo });
    setInitialTimer({ ...initialTimer, [name]: firstTwo });
  };

  const { minutes, seconds } = timer;

  return (
    <div className="App">
      <div className="wrapper">
        <div className="ring">
          <svg width="518" height="518" viewBox="0 0 518 518">
            <circle
              strokeWidth="10px"
              x="0"
              y="y"
              cx="259"
              cy="259"
              r="254"
              strokeLinecap="round"
              strokeDasharray="1596"
              strokeDashoffset="100"
            />
          </svg>
        </div>

        <div className="timer">
          <div className="time">
            <div className="minutes">
              <input
                type="text"
                name="minutes"
                value={padNumber(minutes)}
                onChange={handleChangeInput}
                disabled={!isEditing}
              />
            </div>
            <div className="colon">:</div>
            <div className="seconds">
              <input
                type="text"
                name="seconds"
                value={padNumber(seconds)}
                onChange={handleChangeInput}
                disabled={!isEditing}
              />
            </div>
          </div>
          <button className="start" onClick={handleStartButton} disabled={isEditing}>
            {isRunning ? "stop" : "start"}
          </button>
          <button className="settings" onClick={changeSettings}>
            <img src={isEditing ? check : gear} alt="Settings" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
