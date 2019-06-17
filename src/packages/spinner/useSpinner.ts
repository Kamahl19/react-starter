import { useSelector } from 'react-redux';

import { selectIsInProgress, GLOBAL } from './ducks';

const useSpinner = (id = GLOBAL) => useSelector(state => selectIsInProgress(state, id));

export default useSpinner;
