import { Spin } from 'antd';
import cn from 'classnames';

import { useTrackProgress } from 'common/services/trackProgress';

type Props = {
  fullVPHeight?: boolean;
};

const LoadingScreen = ({ fullVPHeight }: Props) => {
  const isGlobalSpinnerShown = useTrackProgress();

  return isGlobalSpinnerShown ? null : (
    <div
      className={cn('loading-screen', {
        'full-height': !fullVPHeight,
        'full-vp-height': fullVPHeight,
      })}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
