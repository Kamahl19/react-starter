import React, { Suspense } from 'react';
import { makeDecorator } from '@storybook/addons';
import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import StoryRouter from 'storybook-react-router';

import 'common/services/i18next';
import 'app/styles/main.css';

const withI18Next = makeDecorator({
  name: 'withI18Next',
  parameterName: 'i18Next',
  wrapper: (storyFn, context) => <Suspense fallback={<></>}>{storyFn(context)}</Suspense>,
});

addDecorator(withA11y);
addDecorator(withI18Next);
addDecorator(StoryRouter());

const req = require.context('../src', true, /.story.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
