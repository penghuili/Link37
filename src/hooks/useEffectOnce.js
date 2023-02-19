import { useEffect } from 'react';

export function useEffectOnce(callback) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
