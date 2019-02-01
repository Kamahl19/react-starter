import { addDecorator, configure } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import LocaleDecorator from './addons/LocaleDecorator';
import SuspenseDecorator from './addons/SuspenseDecorator';

import '../src/app/styles/main.css';

addDecorator(SuspenseDecorator);
addDecorator(LocaleDecorator);
addDecorator(StoryRouter());

function loadStories() {
  const req = require.context('../src', true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
