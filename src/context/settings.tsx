import { createContext, useState, useContext } from "react";
import { PomodoroMode } from "../shared/types";

interface Settings {
  isModalOn: boolean;
  isPaused: boolean;
  activeMode: PomodoroMode;
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  breakInterval: number;
}

interface ISettingsContext {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const defaultSettings: Settings = {
  isModalOn: false,
  isPaused: true,
  activeMode: PomodoroMode.pomodoro,
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 10,
  breakInterval: 4,
};

const SettingsContext = createContext<ISettingsContext>({
  settings: defaultSettings,
  updateSettings: () => {},
});

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const contextValue: ISettingsContext = {
    settings,
    updateSettings,
  };

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  return { settings, updateSettings };
};

export { SettingsProvider, useSettings };
