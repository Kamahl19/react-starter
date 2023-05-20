import { Space, type SpaceProps } from 'antd';

const SpaceVertical = (props: SpaceProps) => (
  <Space direction="vertical" style={{ width: '100%' }} {...props} />
);

export default SpaceVertical;
