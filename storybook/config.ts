import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import StoryRouter from 'storybook-react-router';

import withI18Next from 'packages/storybook-addon-i18next';

import 'common/services/i18next';
import 'app/styles/main.css';

addDecorator(withA11y);
addDecorator(withI18Next);
addDecorator(StoryRouter());

function loadStories() {
  const req = require.context('../src', true, /.story.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
