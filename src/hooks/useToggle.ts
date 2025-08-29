import { useCallback, useState } from 'react';

export function useToggle(data?: boolean): [boolean, () => void] {
  const [state, setState] = useState<boolean>(data ?? false);
  const toggle = useCallback(() => {
    setState((v) => !v);
  }, []);

  return [state, toggle,setState];
}
