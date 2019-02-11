import { connect } from 'react-redux';

import { selectIsInProgress } from './ducks';

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
          isVisible: selectIsInProgress(state),
        })
  )(Component);
};

export default connectSpinner;
