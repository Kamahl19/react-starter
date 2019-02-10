import { connect } from 'react-redux';

import { selectIsInProgress, selectGlobalCounter } from './ducks';

const connectSpinner = apiCallIds => Component => {
  const createMapStateToProps = apiCallIds => {
    const entries = Object.entries(apiCallIds);

    return state =>
      entries.reduce(
        (acc, [propName, apiCallId]) => ({
          ...acc,
          [propName]: selectIsInProgress(state, apiCallId),
        }),
        {}
      );
  };

  return connect(
    apiCallIds
      ? createMapStateToProps(apiCallIds)
      : state => ({
          isVisible: selectGlobalCounter(state),
        })
  )(Component);
};

export default connectSpinner;
