import { useEffect, useState } from 'react';

function useDebounce(value: number, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<number>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return { debouncedValue, setDebouncedValue };
}

export default useDebounce;
