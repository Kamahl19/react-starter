import { useMemo, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export const isLoadingState = atom<Record<string, boolean>>({
  key: 'isLoading',
  default: {},
});

const useIsLoading = (key: string) => {
  const [isLoadingMap, setIsLoading] = useRecoilState(isLoadingState);

  const isLoading = useMemo(() => !!isLoadingMap[key], [isLoadingMap, key]);

  const startLoading = useCallback(
    () => setIsLoading({ ...isLoadingMap, [key]: true }),
    [setIsLoading, isLoadingMap, key]
  );

  const stopLoading = useCallback(
    () => setIsLoading({ ...isLoadingMap, [key]: false }),
    [setIsLoading, isLoadingMap, key]
  );

  const wrap = useCallback(
    <T = unknown>(promise: Promise<T>) => {
      startLoading();

      promise.then(stopLoading, stopLoading);

      return promise;
    },
    [startLoading, stopLoading]
  );

  return useMemo(() => ({ isLoading, wrap }), [isLoading, wrap]);
};

export default useIsLoading;
