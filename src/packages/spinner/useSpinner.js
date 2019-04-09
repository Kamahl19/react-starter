import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { selectIsInProgress } from './ducks';

export default function useSpinner(id) {
  const { store } = useContext(ReactReduxContext);

  return selectIsInProgress(store.getState(), id);
}
