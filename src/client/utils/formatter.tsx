const formatSecondsToTime = (seconds: number) => {
  const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return hour !== '00' ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
};

const getAge = (birthDate: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate))
    throw new Error('YYYY-MM-DD 형식이 아닙니다.');

  const today = new Date();
  const birthDay = new Date(birthDate);
  let age = today.getFullYear() - birthDay.getFullYear() + 1;

  return age;
};

const floorToHalf = (number: number) => {
  return Math.floor(number * 2) / 2;
};

const addParticle = (word: string) => {
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  const HANGUL_BASE = 0xac00;
  const HANGUL_END = 0xd7a3;

  // 한글이 아닌 경우 그대로 '를' 붙여서 반환
  if (code < HANGUL_BASE || code > HANGUL_END) {
    return (
      <span>
        <strong>{word}</strong>를
      </span>
    );
  }

  const hasFinalConsonant = (code - HANGUL_BASE) % 28 !== 0;
  return hasFinalConsonant ? (
    <span>
      <strong>{word}</strong>이를
    </span>
  ) : (
    <span>
      <strong>{word}</strong>를
    </span>
  );
};

export { formatSecondsToTime, getAge, floorToHalf, addParticle };
