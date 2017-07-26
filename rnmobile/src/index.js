import { AppRegistry, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import App from './app/containers/App';

AppRegistry.registerComponent('rnmobile', () => App);

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}
