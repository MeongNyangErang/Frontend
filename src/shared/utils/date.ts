const getMonthFromDate = (date: Date) => {
  return (date.getMonth() + 1).toString().padStart(2, '0');
};

const getDateFromDate = (date: Date) => {
  return date.getDate().toString().padStart(2, '0');
};

const formatUTCTimeToStr = (UTCTime: string) => {
  const date = new Date(UTCTime);
  if (!date) throw new Error('날짜형식이 올바르지 않습니다.');
  const year = date.getFullYear();
  const month = getMonthFromDate(date);
  const day = getDateFromDate(date);
  return `${year}.${month}.${day}`;
};

export { formatUTCTimeToStr };
