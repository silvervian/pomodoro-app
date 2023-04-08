import { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSettings } from "../context/settings";
import { DisplayTime } from "./../components/DisplayTime";
import { SettingsButton } from "./../components/SettingsButton";
import { ToggleButton } from "./../components/ToggleButton";
import { alarm } from "./../assets";
import { PomodoroMode } from "../shared/types";

export const Timer = () => {
  const { settings, updateSettings, timeForm } = useSettings();
  const [seconds, setSeconds] = useState<number>(0);
  const [workingSession, setWorkingSession] = useState<number>(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { isActive, activeMode } = settings;
  const currentTimeMode = timeForm[settings.activeMode] * 60;

  const playSound = () => {
    const audio = new Audio(alarm);
    audio.play();
  };

  const calculateTimeLeftInPercentage = () => {
    return (seconds / currentTimeMode) * 100;
  };

  useEffect(() => {
    if (isActive) {
      const startTime = new Date().getTime();
      intervalRef.current = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = Math.floor((now - startTime) / 1000);
        setSeconds((s) => s - timeDiff);
        if (seconds < 1) {
          playSound();
          if (activeMode === "pomodoroTime") {
            const nextMode =
              workingSession % timeForm.longBreakInterval === 0
                ? PomodoroMode.longBreak
                : PomodoroMode.shortBreak;
            updateSettings({ ...settings, isActive: false, activeMode: nextMode });
            setWorkingSession((session) => session + 1);
          }
          if (activeMode === "shortBreakTime" || activeMode === "longBreakTime") {
            updateSettings({ ...settings, isActive: false, activeMode: PomodoroMode.pomodoro });
          }

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, 100);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isActive,
    seconds,
    updateSettings,
    settings,
    currentTimeMode,
    activeMode,
    workingSession,
    timeForm.longBreakInterval,
  ]);

  const padNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    if (activeMode === "pomodoroTime") {
      document.title = `${padNumber(Math.floor(seconds / 60))}:${padNumber(
        seconds % 60
      )} - Time for a focus!`;
    } else {
      document.title = `${padNumber(Math.floor(seconds / 60))}:${padNumber(
        seconds % 60
      )} - Time for a break!`;
    }
  }, [activeMode, seconds]);

  useEffect(() => {
    if (activeMode) {
      setSeconds(currentTimeMode);
    }
  }, [activeMode, currentTimeMode]);

  const setColor = () => {
    if (activeMode === "pomodoroTime") {
      return "#f87070";
    } else if (activeMode === "shortBreakTime") {
      return "#38858a";
    } else if (activeMode === "longBreakTime") {
      return "#397097";
    }
  };

  return (
    <div className="timer">
      <CircularProgressbar
        strokeWidth={2}
        counterClockwise={true}
        value={calculateTimeLeftInPercentage()}
        styles={buildStyles({
          trailColor: "transparent",
          pathColor: setColor(),
        })}
      />
      <div className="timer-inner">
        <DisplayTime seconds={seconds} />
        <ToggleButton />
        <SettingsButton />
      </div>
    </div>
  );
};
