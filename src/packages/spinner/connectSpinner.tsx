import { /*React,*/ ComponentType } from 'react';
import { connect } from 'react-redux';

import { selectIsInProgress, GLOBAL } from './ducks';
// import useSpinner from './useSpinner';

type IDMap = Record<string, symbol>;

type TODO = any;

const createMapStateToProps = (ids: IDMap) => {
  const entries = Object.entries(ids);

  return (state: TODO) =>
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

// TODO conditional types when id is defined
// const connectSpinner = (ids?: IDMap) => <P extends {}>(
//   Component: ComponentType<P & { isVisible: boolean }>
// ) => (props: P) => {
//   if (!ids) {
//     const isVisible = useSpinner();

//     return <Component {...props} isVisible={isVisible} />;
//   }

//   return <Component {...props} />;
// };

export default connectSpinner;
