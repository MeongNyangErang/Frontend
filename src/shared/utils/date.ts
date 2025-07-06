const getMonthFromDate = (date: Date) => {
  return (date.getMonth() + 1).toString().padStart(2, '0');
};

const getDateFromDate = (date: Date) => {
  return date.getDate().toString().padStart(2, '0');
};

const formatUTCTimeToStr = (UTCTime: string, withTime: boolean = false) => {
  const date = new Date(UTCTime);
  if (!date) throw new Error('날짜형식이 올바르지 않습니다.');
  const year = date.getFullYear();
  const month = getMonthFromDate(date);
  const day = getDateFromDate(date);

  if (!withTime) return `${year}.${month}.${day}`;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};

export { formatUTCTimeToStr };
