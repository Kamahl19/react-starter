import { Spin } from 'antd';

import { centeredCss, fullVPHeightCss } from '@/common/styleUtils';

type Props = {
  fullVPHeight?: boolean;
};

const LoadingScreen = ({ fullVPHeight }: Props) => (
  <div css={[centeredCss, fullVPHeight && fullVPHeightCss]}>
    <Spin size="large" />
  </div>
);

export default LoadingScreen;
