import { StyleSheet, Platform } from 'react-native';

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
    marginHorizontal: 6,
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderBottomColor: Platform.select({ ios: '#ccc' }),
    borderBottomWidth: Platform.select({ ios: StyleSheet.hairlineWidth }),
  },
  button: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
