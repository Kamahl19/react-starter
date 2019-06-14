import { ComponentType } from 'react';
import { connect } from 'react-redux';

import { selectIsInProgress, GLOBAL } from './ducks';

type IDMap = Record<string, symbol>;

const createMapStateToProps = (ids: IDMap) => {
  const entries = Object.entries(ids);

  return (
    state: any // TODO
  ) =>
    entries.reduce(
      (acc, [propName, id]) => ({
        ...acc,
        [propName]: selectIsInProgress(state, id),
      }),
      {}
    );
};

// TODO
const connectSpinner = (ids?: IDMap) => (Component: ComponentType) =>
  connect(
    ids
      ? createMapStateToProps(ids)
      : state => ({
          isVisible: selectIsInProgress(state, GLOBAL),
        })
  )(Component);

export default connectSpinner;
