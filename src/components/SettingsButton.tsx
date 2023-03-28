import { useSettings } from "../context/settings";
import { gear } from "./../assets";

export const SettingsButton = () => {
  const { settings, updateSettings } = useSettings();

  const { isModalOn } = settings;

  const toggleModal = () => {
    updateSettings({ ...settings, isPaused: true, isModalOn: !isModalOn });
  };

  return (
    <button className="settings">
      <img src={gear} alt="Settings" onClick={toggleModal} />
    </button>
  );
};
