import { useSettings } from "../context/settings";
import { GrFormClose } from "react-icons/gr";
import { ModalInput } from "./ModalInput";

export const Modal = () => {
  const { settings, updateSettings } = useSettings();

  const toggleModal = () => {
    updateSettings({ ...settings, isModalOn: !settings.isModalOn });
  };

  const { isModalOn } = settings;

  return (
    <>
      {isModalOn && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button className="modal-close" onClick={toggleModal}>
                <GrFormClose />
              </button>
            </div>
            <div className="modal-body">
              <ModalInput title="Pomodoro" name="pomodoroTime" />
              <ModalInput title="Short Break" name="shortBreakTime" />
              <ModalInput title="Long Break" name="longBreakTime" />
              <ModalInput title="Long Break Interval" name="longBreakInterval" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
