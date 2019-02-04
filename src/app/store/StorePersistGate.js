import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { reloginAction, selectIsLoggedIn } from '../../common/services/user';

import { history, persistor } from './configureStore';

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = {
  relogin: reloginAction,
};

const StorePersistGate = ({ children, isLoggedIn, relogin }) => (
  <PersistGate
    loading={<></>}
    onBeforeLift={() => {
      if (isLoggedIn && history.location.pathname !== '/logout') {
        relogin();
      }
    }}
    persistor={persistor}
  >
    {children}
  </PersistGate>
);

StorePersistGate.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  relogin: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePersistGate);
