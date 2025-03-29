export const formatSecondsToTime = (seconds: number) => {
  const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return hour !== '00' ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
};
