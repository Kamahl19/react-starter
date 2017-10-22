import { StyleSheet } from 'react-native';

import { getColor } from '../../../common/utils/color';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  textInputContainer: {
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderBottomColor: getColor('gray'),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
