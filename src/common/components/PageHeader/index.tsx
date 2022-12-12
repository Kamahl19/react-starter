import { type ReactNode } from 'react';
import { Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export type PageHeaderProps = {
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  backTo?: string;
  breadcrumbs?: ReactNode;
};

const PageHeader = ({ children, title, extra, backTo, breadcrumbs }: PageHeaderProps) => (
  <div className="page-header">
    {breadcrumbs}
    {(title || backTo || extra) && (
      <div className="page-header-heading">
        <div className="page-header-heading-left">
          {backTo && (
            <Link to={backTo} className="page-header-back">
              <ArrowLeftOutlined />
            </Link>
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
