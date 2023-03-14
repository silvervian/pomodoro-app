import React, { useEffect, useRef, useState } from "react";
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
  const [progress, setProgress] = useState<number>(1596);
  let timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      document.title = `Pomodoro Timer | ${padNumber(timer.minutes)}:${padNumber(timer.seconds)}`;
    }

    return () => {
      document.title = "Pomodoro Timer";
      // if (timerRef.current !== null) {
      //   window.clearInterval(timerRef.current);
      // }
    };
  }, [isRunning]);

  const changeSettings = () => {
    setIsEditing(!isEditing);
    stopTimer();
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

  const tikTackToe = (totalSeconds: number) => {
    const tick = 1596 / totalSeconds;
    return tick;
  };

  const startTimer = () => {
    console.log("startTimer");
    setIsRunning(true);
    const totalSeconds = timer.minutes * 60 + timer.seconds;
    const startTime = +new Date();
    timerRef.current = window.setInterval(() => {
      setProgress((prev) => prev - tikTackToe(totalSeconds));
      const currentTime = +new Date();
      const diff = currentTime - startTime;
      const secondsLeft = totalSeconds - Math.floor(diff / 1000);
      const minutesLeft = Math.floor(secondsLeft / 60);
      setTimer({ minutes: minutesLeft, seconds: secondsLeft % 60 });
      if (secondsLeft <= 0) {
        finishTimer();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    stopCountdown();
  };

  const finishTimer = () => {
    setIsRunning(false);
    stopCountdown();
    new Audio(alarm).play();
    setTimer(initialTimer);
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
              strokeDashoffset={progress}
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
