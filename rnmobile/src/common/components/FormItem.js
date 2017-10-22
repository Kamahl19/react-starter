import React from 'react';
import { StyleSheet } from 'react-native';

import { FormItem } from '../../common/services/Form';
import { getColor } from '../utils/color';

export default props => (
  <FormItem
    errorStyle={styles.errorStyle}
    successStyle={styles.successStyle}
    validatingStyle={styles.validatingStyle}
    {...props}
  />
);

const styles = StyleSheet.create({
  successStyle: {
    color: getColor('green'),
  },
  errorStyle: {
    color: getColor('red'),
  },
  validatingStyle: {
    color: getColor('lightGray'),
  },
});
