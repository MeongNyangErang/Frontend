export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? (item as T) : null;
};

export const setLocalStorage = (key: string, value: unknown) => {
  const realValue = typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, realValue);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
