import { createContext, useState, useContext } from "react";
import { PomodoroMode } from "../shared/types";

export interface ISettings {
  isModalOn: boolean;
  isActive: boolean;
  activeMode: PomodoroMode;
}

export interface ITimeForm {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
}

interface ISettingsContext {
  settings: ISettings;
  updateSettings: (settings: ISettings) => void;
  timeForm: ITimeForm;
  updateTimeForm: (TimeForm: ITimeForm) => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const defaultSettings: ISettings = {
  isModalOn: false,
  isActive: false,
  activeMode: PomodoroMode.pomodoro,
};

const defaultTimeForm: ITimeForm = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 10,
  longBreakInterval: 4,
};

const SettingsContext = createContext<ISettingsContext>({
  settings: defaultSettings,
  updateSettings: () => {},
  timeForm: defaultTimeForm,
  updateTimeForm: () => {},
});

const sessionDefaultTime =
  JSON.parse(
    localStorage.getItem("settings") ||
      '{"pomodoroTime":25,"shortBreakTime":5,"longBreakTime":10,"longBreakInterval":4}'
  ) || defaultTimeForm;

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<ISettings>(defaultSettings);
  const [timeForm, setTimeForm] = useState<ITimeForm>(sessionDefaultTime);

  const updateSettings = (newSettings: ISettings) => {
    setSettings(newSettings);
  };
  const updateTimeForm = (newTimeForm: ITimeForm) => {
    setTimeForm(newTimeForm);
  };

  const contextValue: ISettingsContext = {
    settings,
    updateSettings,
    timeForm,
    updateTimeForm,
  };

  return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const { settings, updateSettings, timeForm, updateTimeForm } = useContext(SettingsContext);
  return { settings, updateSettings, timeForm, updateTimeForm };
};

export { SettingsProvider, useSettings };
