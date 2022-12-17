import { useMemo } from 'react';
import { Card, type CardProps } from 'antd';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Menu } from 'common/components';

type Props = CardProps & {
  menuItems?: {
    to: string;
    label: string;
  }[];
};

const Widget = ({ className, menuItems, children, ...props }: Props) => {
  const items = useMemo(
    () =>
      menuItems?.map(({ to, label }) => ({
        key: to,
        label: <Link to={to}>{label}</Link>,
      })),
    [menuItems]
  );

  return (
    <Card bordered={false} className={cn('widget', className)} {...props}>
      {items ? (
        <div className="widget-with-menu">
          <div className="widget-menu">
            <Menu mode="inline" items={items} />
          </div>
          <div className="widget-content">{children}</div>
        </div>
      ) : (
        children
      )}
    </Card>
  );
};

export default Widget;
