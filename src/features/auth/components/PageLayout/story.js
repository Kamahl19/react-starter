import React from 'react';
import { storiesOf } from '@storybook/react';

import ReduxDecorator from '../../../../../storybook/addons/ReduxDecorator';

import PageLayout from './';

storiesOf('auth/PageLayout', module)
  .addDecorator(
    ReduxDecorator({
      spinner: () => ({
        globalCounter: 1,
      }),
    })
  )
  .add('default', () => <PageLayout />);
