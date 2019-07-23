import { useSelector } from 'react-redux';

import { selectIsInProgress, GLOBAL, SpinnerKeyInState } from './ducks';

const useSpinner = <S extends SpinnerKeyInState>(id = GLOBAL) =>
  useSelector((state: S) => selectIsInProgress(state, id));

export default useSpinner;
