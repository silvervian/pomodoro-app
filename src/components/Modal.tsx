import { useSettings } from "../context/settings";

export const Modal = () => {
  const { settings, updateSettings } = useSettings();

  const toggleModal = () => {
    updateSettings({ ...settings, isModalOn: !settings.isModalOn });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSettings({ ...settings, [name]: value });
  };

  const { isModalOn, pomodoroTime, shortBreakTime, longBreakTime } = settings;

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
              <label className="label" htmlFor="pomodoroTime">
                Pomodoro
                <input
                  type="number"
                  name="pomodoroTime"
                  value={pomodoroTime}
                  onChange={handleInputChange}
                  id="pomodoroTime"
                  min="1"
                  max="60"
                />
              </label>
              <label className="label" htmlFor="short-break">
                Short Break
                <input
                  type="number"
                  name="shortBreakTime"
                  value={shortBreakTime}
                  onChange={handleInputChange}
                  id="short-break"
                  min="1"
                  max="60"
                />
              </label>
              <label className="label" htmlFor="longBreakTime">
                Long Break
                <input
                  type="number"
                  name="longBreakTime"
                  value={longBreakTime}
                  onChange={handleInputChange}
                  id="longBreakTime"
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
