import React from 'react';
import { storiesOf } from '@storybook/react';

import PageLayout from './';

storiesOf('auth/PageLayout', module).add('default', () => <PageLayout children={<></>} />);
