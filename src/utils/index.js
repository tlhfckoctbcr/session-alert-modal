export const secondsUntil = dateTime => {
  if (dateTime === Infinity) return dateTime;
  const value = Math.floor((new Date(dateTime) - new Date()) / 1000);
  return value < 0 ? 0 : value;
};

export const formatTime = time => {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;

  if (!minutes) return `${seconds} seconds`;
  return `${minutes} minute${minutes === 1 ? "" : "s"}, ${seconds} seconds`;
};
