import { ReactElement } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

export const useTrackProgress = (id?: string) => usePromiseTracker({ area: id }).promiseInProgress;

export { trackPromise as trackProgress } from 'react-promise-tracker';

export const TrackProgress = ({
  children,
  id,
}: {
  children: (isLoading: boolean) => ReactElement;
  id?: string;
}) => {
  const isLoading = useTrackProgress(id);
  return children(isLoading);
};
