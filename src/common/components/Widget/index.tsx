import { Card, CardProps } from 'antd';

interface WidgetProps extends CardProps {}

const Widget = (props: WidgetProps) => <Card bordered={false} {...props} />;

export default Widget;
