import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { selectIsInProgress, selectGlobalCounter } from './ducks';

const useSpinner = apiCallId => {
  const { storeState } = useContext(ReactReduxContext);

  return apiCallId ? selectIsInProgress(storeState, apiCallId) : selectGlobalCounter(storeState);
};

export default useSpinner;
