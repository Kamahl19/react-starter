import PropTypes from 'prop-types';

import { connectSpinner } from './ducks';

const GlobalSpinnerProvider = ({ children, isVisible }) => children({ isVisible });

GlobalSpinnerProvider.propTypes = {
  children: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default connectSpinner()(GlobalSpinnerProvider);
