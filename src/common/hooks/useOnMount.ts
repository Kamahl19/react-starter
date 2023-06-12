import { useEffect } from 'react';

const useOnMount = (callback: Parameters<typeof useEffect>[0]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export default useOnMount;
