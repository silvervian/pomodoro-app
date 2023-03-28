import { useSettings } from "../context/settings";
import { PomodoroMode } from "../shared/types";
import { controllers } from "../shared/constants";

export const Labels = () => {
  const { settings, updateSettings } = useSettings();

  const changeMode = (mode: PomodoroMode) => {
    updateSettings({ ...settings, activeMode: mode });
  };

  return (
    <div className="labels">
      {controllers.map((controller) => {
        return (
          <button
            className={`option-btn ${controller.value === settings.activeMode ? "active" : ""}`}
            onClick={() => changeMode(controller.value as PomodoroMode)}
            key={controller.value}
          >
            {controller.label}
          </button>
        );
      })}
    </div>
  );
};
