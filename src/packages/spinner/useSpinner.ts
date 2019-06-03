import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { selectIsInProgress, GLOBAL } from './ducks';

export default function useSpinner(id = GLOBAL) {
  const { store } = useContext(ReactReduxContext);

  return selectIsInProgress(store.getState(), id);
}
