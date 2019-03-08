import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withViewport } from '@storybook/addon-viewport';
import StoryRouter from 'storybook-react-router';

import i18NextDecorator from '../src/packages/storybook-addon-i18next';

import i18next from '../src/common/services/i18next';

import '../src/app/styles/main.css';

addDecorator(withA11y);
addDecorator(withViewport);
addDecorator(i18NextDecorator(i18next));
addDecorator(StoryRouter());

function loadStories() {
  const req = require.context('../src', true, /.story.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
