import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = () => (
  <div className="loading-screen">
    <Spin size="large" />
  </div>
);

export default LoadingScreen;
