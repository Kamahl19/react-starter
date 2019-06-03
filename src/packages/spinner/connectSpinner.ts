import { ComponentType } from 'react';
import { connect } from 'react-redux';

import { selectIsInProgress, GLOBAL } from './ducks';

type ids = Record<string, symbol>;

const createMapStateToProps = (ids: ids) => {
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

// TODO
const connectSpinner = (ids?: ids) => <P extends {}>(Component: ComponentType<P>) =>
  connect(
    ids
      ? createMapStateToProps(ids)
      : state => ({
          isVisible: selectIsInProgress(state, GLOBAL),
        })
  )(Component);

export default connectSpinner;
