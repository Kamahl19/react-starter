import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import i18n from '../../app/i18n';
import routes from '../../app/routes';
import App from './App';
import ScrollToTop from './ScrollToTop';

const Root = ({ store, history }) => (
  <I18nextProvider i18n={i18n}>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <App>{routes}</App>
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>
    </LocaleProvider>
  </I18nextProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
