import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, View } from '../../../common/components';

const Spinner = ({ show, children, large }) => {
  const Indicator = <ActivityIndicator size={large ? 'large' : 'small'} style={styles.spinner} />;

  if (children) {
    return (
      <View style={styles.container}>
        {children}
        {show && Indicator}
      </View>
    );
  }

  return Indicator;
};

Spinner.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  large: PropTypes.bool,
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
