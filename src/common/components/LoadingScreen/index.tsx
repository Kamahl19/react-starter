import { Spin } from 'antd';

type Props = {
  fullVPHeight?: boolean;
};

const LoadingScreen = ({ fullVPHeight }: Props) => (
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
);

export default LoadingScreen;
