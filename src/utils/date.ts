const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const stringToDate = (dateStr: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return null;
  const [year, month, date] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, date);
};

const formatDateStrToKorean = (dateStr: string) => {
  const date = stringToDate(dateStr);
  if (!date) throw new Error('날짜형식이 올바르지 않습니다.');
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const weekdays = ['일', '월', '화', '수', '목', '금', '토'] as const;

const formatDateStrToStrWithDay = (dateStr: string) => {
  const date = stringToDate(dateStr);
  if (!date) throw new Error('날짜형식이 올바르지 않습니다.');
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayName = weekdays[date.getDay()];
  return `${year}.${month}.${day}(${dayName})`;
};

const formatDateOrTime = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  if (isToday) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  if (date.getFullYear() === today.getFullYear()) return `${month}.${day}`;

  return `${date.getFullYear()}.${month}.${day}`;
};

export {
  formatDate,
  stringToDate,
  formatDateStrToKorean,
  formatDateStrToStrWithDay,
  formatDateOrTime,
};
