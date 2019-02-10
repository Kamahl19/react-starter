import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { selectIsInProgress, selectGlobalCounter } from './ducks';

const useSpinner = id => {
  const { storeState } = useContext(ReactReduxContext);

  return id ? selectIsInProgress(storeState, id) : selectGlobalCounter(storeState);
};

export default useSpinner;
