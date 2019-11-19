import React from 'react';
import { CardProps } from 'antd/lib/card';

import { Card } from 'common/components';

interface WidgetProps extends CardProps {}

const Widget = (props: WidgetProps) => <Card bordered={false} {...props} />;

export default Widget;
