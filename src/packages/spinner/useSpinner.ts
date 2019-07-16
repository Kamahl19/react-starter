import { useSelector } from 'react-redux';

import { AppState } from '../../app/store';
import { selectIsInProgress, GLOBAL } from './ducks';

const useSpinner = (id = GLOBAL) => useSelector((state: AppState) => selectIsInProgress(state, id));

export default useSpinner;
