import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { reloginAction } from '../../common/services/user';

import { persistor } from './configureStore';

const mapDispatchToProps = {
  relogin: reloginAction,
};

const StorePersistGate = ({ children, relogin }) => (
  <PersistGate loading={<></>} onBeforeLift={relogin} persistor={persistor}>
    {children}
  </PersistGate>
);

StorePersistGate.propTypes = {
  children: PropTypes.node.isRequired,
  relogin: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(StorePersistGate);
