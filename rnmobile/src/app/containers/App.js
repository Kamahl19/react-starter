import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import AlertService from '../../common/services/alert';
import {
  prepareRequestInterceptor,
  handleResponsesInterceptor,
} from '../../common/services/apiClient';
import { relogin } from '../../features/auth/ducks';
import configureStore from '../store/configureStore';
import AppNavigator from '../navigators/AppNavigator';
import BootScreen from '../components/BootScreen';

export default class App extends Component {
  state = {
    store: undefined,
  };

  componentWillMount() {
    this.initStore().then(store => this.setState({ store }));
  }

  async initStore() {
    const store = await configureStore();

    prepareRequestInterceptor(store);
    handleResponsesInterceptor(store);

    const state = store.getState();

    if (state && state.auth) {
      store.dispatch(relogin(state.auth));
    }

    return store;
  }

  render() {
    const { store } = this.state;

    if (!store) {
      return <BootScreen />;
    }

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <DropdownAlert ref={ref => AlertService.setAlert(ref)} />
        </View>
      </Provider>
    );
  }
}

// TODO flex: 1
