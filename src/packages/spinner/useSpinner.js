import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { selectIsInProgress } from './ducks';

export default function useSpinner(id) {
  const { storeState } = useContext(ReactReduxContext);

  return selectIsInProgress(storeState, id);
}
