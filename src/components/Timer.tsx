import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSettings } from "../context/settings";
import { DisplayTime } from "./../components/DisplayTime";
import { SettingsButton } from "./../components/SettingsButton";
import { ToggleButton } from "./../components/ToggleButton";

export const Timer = () => {
  const { settings, updateSettings } = useSettings();
  const [seconds, setSeconds] = useState<number>(0);

  const { isPaused, activeMode } = settings;

  // const actualMode = settings.activeMode;
  // console.log(actualMode);
  // let seconds = settings[actualMode] * 60;
  console.log(seconds);

  useEffect(() => {
    if (settings[settings.activeMode]) {
      setSeconds(settings[settings.activeMode] * 60);
    }
  }, [settings]);

  useEffect(() => {
    let interval: number;
    if (!isPaused) {
      interval = window.setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds < 0) {
          window.clearInterval(interval);
        }
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isPaused, seconds]);

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
