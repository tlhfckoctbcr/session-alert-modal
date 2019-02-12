export const compareExpirationDateTimeToNow = (expirationDateTime) =>
  Math.floor((new Date(expirationDateTime) - new Date()) / 1000);