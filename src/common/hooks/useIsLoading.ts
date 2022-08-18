import { useMemo } from 'react';
import { atom, useRecoilValue, useRecoilCallback } from 'recoil';

export const isLoadingState = atom<Record<string, number>>({
  key: 'isLoading',
  default: {},
});

const increaseCount = (count = 0) => count + 1;
const decreaseCount = (count = 0) => Math.max(count - 1, 0);
const getIsLoading = (count = 0) => count > 0;

const useIsLoading = (key: string) => {
  const startLoading = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const state = await snapshot.getPromise(isLoadingState);

        set(isLoadingState, {
          ...state,
          [key]: increaseCount(state[key]),
        });
      },
    [key]
  );

  const stopLoading = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const state = await snapshot.getPromise(isLoadingState);

        set(isLoadingState, {
          ...state,
          [key]: decreaseCount(state[key]),
        });
      },
    [key]
  );

  const state = useRecoilValue(isLoadingState);

  return useMemo(
    () => ({
      isLoading: getIsLoading(state[key]),
      startLoading,
      stopLoading,
    }),
    [state, key, startLoading, stopLoading]
  );
};

export default useIsLoading;
