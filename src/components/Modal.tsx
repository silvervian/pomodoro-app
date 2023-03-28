import { useState } from "react";
import { useSettings } from "../context/settings";
// import { ModalInput } from "./ModalInput";

export interface modalSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  intervalBreak: number;
}

export const Modal = () => {
  const [pomodoro, setPomodoro] = useState([
    { name: "pomodoro", pomodoroTime: 25 },
    { name: "short-break", shortBreakTime: 5 },
    { name: "long-break", longBreakTime: 15 },
    { name: "break-interval", breakInterval: 4 },
  ]);
  const [modalSettings, setModalSettings] = useState<modalSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    intervalBreak: 4,
  });
  const { settings, updateSettings } = useSettings();

  const toggleModal = () => {
    updateSettings({ ...settings, isModalOn: !settings.isModalOn });
  };

  console.log(settings);
  const { isModalOn, pomodoroTime, shortBreakTime, longBreakTime, breakInterval } = settings;

  return (
    <>
      {isModalOn && (
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <h2>Settings</h2>
              <button className="modal-close" onClick={toggleModal}>
                X
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="short-break">
                Pomodoro
                <input
                  type="number"
                  value={shortBreakTime / 60}
                  id="short-break"
                  min="1"
                  max="60"
                />
              </label>
              <label htmlFor="short-break">
                Short Break
                <input
                  type="number"
                  value={shortBreakTime / 60}
                  id="short-break"
                  min="1"
                  max="60"
                />
              </label>
              <label htmlFor="long-break">
                Long Break
                <input type="number" value={longBreakTime / 60} id="long-break" min="1" max="60" />
              </label>
              <label htmlFor="break-interval">
                Break Interval
                <input
                  type="number"
                  defaultValue={breakInterval}
                  id="break-interval"
                  min="1"
                  max="60"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
