import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from '../app/store/configureStore';

const { store } = configureStore(createHistory());

export default function ReduxProvider({ story: Story }) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
}
