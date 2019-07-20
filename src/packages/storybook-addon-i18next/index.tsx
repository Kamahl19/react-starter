import React, { Suspense } from 'react';
import { StoryDecorator } from '@storybook/react';

const withI18Next: StoryDecorator = story => <Suspense fallback={<></>}>{story()}</Suspense>;

export default withI18Next;
