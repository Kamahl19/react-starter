import { type ReactNode } from 'react';
import { Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export type PageHeaderProps = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  backTo?: string;
  onBack?: VoidFunction;
  breadcrumbs?: ReactNode;
};

const PageHeader = ({ children, title, extra, backTo, onBack, breadcrumbs }: PageHeaderProps) => (
  <div className="page-header">
    {breadcrumbs}
    {(title || backTo || onBack || extra) && (
      <div className="page-header-heading">
        <div className="page-header-heading-left">
          {backTo && (
            <Link to={backTo} className="page-header-back">
              <ArrowLeftOutlined />
            </Link>
          )}
          {onBack && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <span onClick={onBack} className="page-header-back">
              <ArrowLeftOutlined />
            </span>
          )}
          {title && <span className="page-header-heading-title">{title}</span>}
        </div>
        {extra && (
          <span className="page-header-heading-extra">
            <Space>{extra}</Space>
          </span>
        )}
      </div>
    )}
    {children && <div className="page-header-content">{children}</div>}
  </div>
);

export default PageHeader;
