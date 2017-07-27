import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { FormItem } from '../../common/services/Form';

export default props =>
  <FormItem
    successStyle={styles.successStyle}
    errorStyle={styles.errorStyle}
    validatingStyle={styles.validatingStyle}
    {...props}
  />;

const styles = StyleSheet.create({
  successStyle: {
    color: Platform.select({ ios: 'rgb(76, 217, 100)', android: '#4CAF50' }),
  },
  errorStyle: {
    color: Platform.select({ ios: 'rgb(255, 59, 48)', android: '#F44336' }),
  },
  validatingStyle: {
    color: Platform.select({ ios: '#8e8e93', android: '#9E9E9E' }),
  },
});
