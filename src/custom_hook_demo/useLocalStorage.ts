import { useEffect, useState } from 'react';

// 必须强调返回值，否则报类型错误
const useLocalStorage = <T = string>(key: string, defaultVal: T):
  [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultVal);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
