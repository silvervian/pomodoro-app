import { useSettings } from "../context/settings";

export const ToggleButton = () => {
  const { settings, updateSettings } = useSettings();

  const { isPaused } = settings;

  const toggleTimer = () => {
    updateSettings({ ...settings, isPaused: !settings.isPaused });
  };

  return (
    <button className="toggle-button" onClick={toggleTimer}>
      {!isPaused ? "stop" : "start"}
    </button>
  );
};
