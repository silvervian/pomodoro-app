import { ITimeForm } from "../context/settings";
import { useSettings } from "../context/settings";

interface ModalInputProps {
  title: string;
  name: string;
}

export const ModalInput = ({ title, name }: ModalInputProps) => {
  const { timeForm, updateTimeForm } = useSettings();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value.substring(0, 2));
    updateTimeForm({ ...timeForm, [name]: newValue });
  };

  return (
    <label className="label" htmlFor={name}>
      {title}
      <input
        type="number"
        name={name}
        value={timeForm[name as keyof ITimeForm]}
        onChange={handleInputChange}
        id={name}
        min="1"
        max="99"
      />
    </label>
  );
};
