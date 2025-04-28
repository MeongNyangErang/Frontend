export const compareObjs = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (value1.length !== value2.length) return false;
      return value1.every((v, i) => v === value2[i]);
    }
    return value1 === value2;
  });
};

export const isAllValuesEmpty = (obj: Record<string, any>) => {
  const values = Object.values(obj);
  return values.every((v) => {
    if (Array.isArray(v)) return v.length === 0;
    if (v !== null && typeof v === 'object')
      return Object.values(v).length === 0;
    return v === '';
  });
};
