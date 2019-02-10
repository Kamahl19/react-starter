import { connect } from 'react-redux';

import { selectIsInProgress, selectGlobalCounter } from './ducks';

const connectSpinner = ids => Component => {
  const createMapStateToProps = ids => {
    const entries = Object.entries(ids);

    return state =>
      entries.reduce(
        (acc, [propName, id]) => ({
          ...acc,
          [propName]: selectIsInProgress(state, id),
        }),
        {}
      );
  };

  return connect(
    ids
      ? createMapStateToProps(ids)
      : state => ({
          isVisible: selectGlobalCounter(state),
        })
  )(Component);
};

export default connectSpinner;
