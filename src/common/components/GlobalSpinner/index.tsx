import { ReactNode } from 'react';
import { Spin } from 'antd';

import { useTrackProgress } from 'common/services/trackProgress';

const GlobalSpinner = ({ children }: { children: ReactNode }) => {
  const isInProgress = useTrackProgress();

  return (
    <Spin spinning={isInProgress} size="large">
      {children}
    </Spin>
  );
};

export default GlobalSpinner;
