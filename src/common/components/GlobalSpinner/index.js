import React from 'react';
import PropTypes from 'prop-types';

import { connectSpinner } from '../../services/spinner';

import { Spin } from '../';

const GlobalSpinner = ({ children, isLoading }) => (
  <Spin spinning={isLoading} size="large">
    {children}
  </Spin>
);

GlobalSpinner.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connectSpinner()(GlobalSpinner);
