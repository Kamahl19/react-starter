import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CenterView = ({ direction, style, ...rest }) => {
  const directionStyle = styles[direction === 'row' ? 'rowDirection' : 'columnDirection'];

  return <View style={[styles.component, directionStyle, style]} {...rest} />;
};

CenterView.propTypes = {
  direction: PropTypes.string,
  style: PropTypes.object,
};

export default CenterView;

const styles = StyleSheet.create({
  component: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
});
