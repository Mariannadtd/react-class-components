import { useState } from "react";

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string): void => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
