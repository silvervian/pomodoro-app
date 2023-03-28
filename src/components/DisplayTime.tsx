interface DisplayTimeProps {
  seconds: number;
}

export const DisplayTime = ({ seconds }: DisplayTimeProps) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="time">
      <div className="minutes">{min < 10 ? "0" + min : min}</div>
      <div className="colon">:</div>
      <div className="seconds">{sec < 10 ? "0" + sec : sec}</div>
    </div>
  );
};
