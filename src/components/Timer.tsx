import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSettings } from "../context/settings";
import { DisplayTime } from "./../components/DisplayTime";
import { SettingsButton } from "./../components/SettingsButton";
import { ToggleButton } from "./../components/ToggleButton";
import { alarm } from "./../assets";

export const Timer = () => {
  const { settings, updateSettings, timeForm } = useSettings();
  const [seconds, setSeconds] = useState<number>(0);

  const { isPaused, activeMode } = settings;

  const currentTimeMode = timeForm[settings.activeMode] * 60;

  const playSound = () => {
    const audio = new Audio(alarm);
    audio.play();
  };

  const calculateTimeLeftInPercentage = () => {
    return (seconds / currentTimeMode) * 100;
  };

  useEffect(() => {
    if (activeMode) {
      setSeconds(currentTimeMode);
    }
  }, [activeMode, currentTimeMode]);

  useEffect(() => {
    let interval: number;
    if (!isPaused) {
      interval = window.setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds < 1) {
          playSound();
          window.clearInterval(interval);
          updateSettings({ ...settings, isPaused: true });
          setSeconds(currentTimeMode);
        }
      }, 1000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, seconds, updateSettings, settings, currentTimeMode]);

  return (
    <div className="timer">
      <CircularProgressbar
        strokeWidth={2}
        counterClockwise={true}
        value={calculateTimeLeftInPercentage()}
        // value={100}
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
