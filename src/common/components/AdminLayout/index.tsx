import { type ReactNode, useState, useCallback } from 'react';

type Props = {
  className?: string;
  logo?: ReactNode;
  children?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  sidebarCollapsedWidth?: number | string;
  sidebarWidth?: number | string;
};

const AdminLayout = ({
  className,
  logo,
  children,
  headerContent,
  sidebarContent,
  sidebarCollapsedWidth = 80,
  sidebarWidth = 256,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = useCallback(() => setIsCollapsed((s) => !s), []);

  return (
    <div
      className={className}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <aside
        style={{
          height: '100vh',
          width: isCollapsed ? sidebarCollapsedWidth : sidebarWidth,
        }}
      >
        <div>{logo}</div>
        {sidebarContent && <div>{sidebarContent}</div>}
        <button onClick={toggle}>Toggle</button>
      </aside>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <header>{headerContent}</header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
