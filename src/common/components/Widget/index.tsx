import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

interface WidgetProps extends CardProps {}

const Widget = (props: WidgetProps) => <Card bordered={false} {...props} />;

export default Widget;
