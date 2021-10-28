import { Spin } from 'antd';

import { useTrackProgress } from 'common/services/trackProgress';

type Props = {
  fullVPHeight?: boolean;
  isGlobal?: boolean;
};

const LoadingScreen = ({ fullVPHeight, isGlobal }: Props) => {
  const isGlobalSpinnerInProgress = useTrackProgress();

  return (isGlobal && isGlobalSpinnerInProgress) || (!isGlobal && !isGlobalSpinnerInProgress) ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullVPHeight ? '100vh' : '100%',
      }}
    >
      <Spin size="large" />
    </div>
  ) : null;
};

export default LoadingScreen;
