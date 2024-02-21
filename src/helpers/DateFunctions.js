const getConvertedTime = (ts) => {
  const date = new Date(ts);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day > 9 ? day : '0' + day}.${month > 9 ? month : '0' + month}.${date.getFullYear()}`;
};

const getStartOfDay = () => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  return startOfDay.getTime();
};

export {
  getConvertedTime,
  getStartOfDay,
};
