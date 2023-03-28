import { useEffect, useRef, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSettings } from "../context/settings";
import { DisplayTime } from "./../components/DisplayTime";
import { SettingsButton } from "./../components/SettingsButton";
import { ToggleButton } from "./../components/ToggleButton";
import { alarm } from "./../assets";

export const Timer = () => {
  const { settings, updateSettings } = useSettings();
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<number>();

  const defaultTime = settings[settings.activeMode] * 60;
  const { isPaused, activeMode } = settings;

  const playSound = () => {
    const audio = new Audio(alarm);
    audio.play();
  };

  // const calculateTimeLeft = () => {
  //   defaultTime;
  // };

  useEffect(() => {
    if (activeMode) {
      setSeconds(defaultTime);
    }
  }, [activeMode, defaultTime]);

  useEffect(() => {
    console.log(seconds);
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [isPaused, seconds]);

  useEffect(() => {
    if (seconds <= 0) {
      playSound();
      updateSettings({ ...settings, isPaused: true });
      window.clearInterval(intervalRef.current);
    }
  }, [seconds, updateSettings, settings]);

  return (
    <div className="timer">
      <CircularProgressbar
        strokeWidth={2}
        counterClockwise={true}
        value={seconds}
        styles={buildStyles({
          trailColor: "transparent",
          pathColor: "#f87070",
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
