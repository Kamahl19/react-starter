import { AppRegistry, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

import './ReactotronConfig';
import Root from './app/containers/Root';

AppRegistry.registerComponent('rnmobile', () => Root);

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
}
