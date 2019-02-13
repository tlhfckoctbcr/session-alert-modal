export const compareExpirationDateTimeToNow = expirationDateTime => {
  const value = Math.floor((new Date(expirationDateTime) - new Date()) / 1000);
  return value < 0 ? 0 : value;
};
