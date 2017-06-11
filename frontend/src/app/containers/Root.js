import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from '@src/app/i18n';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import routes from '@src/app/routes';

const Root = ({ store, history }) =>
  <I18nextProvider i18n={i18n}>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
          {routes}
        </Router>
      </Provider>
    </LocaleProvider>
  </I18nextProvider>;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
