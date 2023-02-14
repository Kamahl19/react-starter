import { Descriptions as DescriptionsOrig, type DescriptionsProps } from 'antd';

const DEFAULT_COLUMN = {
  xxl: 6,
  xl: 4,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

const Descriptions = (props: DescriptionsProps) => (
  <DescriptionsOrig
    layout="vertical"
    size="small"
    colon={false}
    column={DEFAULT_COLUMN}
    {...props}
  />
);

Descriptions.Item = DescriptionsOrig.Item;

export default Descriptions;
