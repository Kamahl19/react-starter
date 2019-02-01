import React, { Suspense } from 'react';

export default storyFn => <Suspense fallback={<div>loading</div>}>{storyFn()}</Suspense>;
