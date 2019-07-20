import React from 'react';

import { Spin } from '../';

const LoadingScreen = () => (
  <div className="loading-screen">
    <Spin spinning size="large" />
  </div>
);

export default LoadingScreen;
