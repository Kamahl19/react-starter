import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../src/app/store/configureStore';

export default story => <Provider store={store}>{story()}</Provider>;
