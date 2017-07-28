import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { View } from '../../common/components';
import AlertService from '../../common/services/alert';
import { Spinner } from '../../features/spinner/components';
import { selectShowSpinner } from '../../features/spinner/ducks';
import AppNavigator from '../navigators/AppNavigator';

const mapStateToProps = state => ({
  showSpinner: selectShowSpinner(state),
});

const App = ({ showSpinner }) =>
  <View style={{ flexGrow: 1 }}>
    <AppNavigator />
    {showSpinner && <Spinner large />}
    <DropdownAlert ref={ref => AlertService.setAlert(ref)} />
  </View>;

App.propTypes = { showSpinner: PropTypes.bool.isRequired };

export default connect(mapStateToProps)(App);
