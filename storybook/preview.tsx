import React, { Suspense } from 'react';
import { makeDecorator } from '@storybook/addons';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import StoryRouter from 'storybook-react-router';

import 'common/services/i18next';
import 'app/styles/main.css';

addDecorator(withA11y);
addDecorator(
  makeDecorator({
    name: 'withI18Next',
    parameterName: 'i18Next',
    wrapper: (storyFn, context) => <Suspense fallback={<></>}>{storyFn(context)}</Suspense>,
  })
);
addDecorator(StoryRouter());
