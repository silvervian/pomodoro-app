import { useSettings } from "../context/settings";

export const ToggleButton = () => {
  const { settings, updateSettings } = useSettings();

  const { isActive } = settings;

  const toggleTimer = () => {
    updateSettings({ ...settings, isActive: !isActive });
  };

  return (
    <button className="toggle-button" onClick={toggleTimer}>
      {isActive ? "stop" : "start"}
    </button>
  );
};
