import { addDecorator, configure } from '@storybook/react';

import LocaleDecorator from './addons/LocaleDecorator';
import Row from './addons/Row';

import '../src/app/styles/main.css';

addDecorator(LocaleDecorator);
addDecorator(Row.Decorator);

function loadStories() {
  const req = require.context('../src', true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
