# Admin Layout

## Usage

```tsx
const Page = () => (
  <AdminLayout
    logo={<Logo />}
    headerContent="Header navigation menu"
    sidebarContent={<SidebarContent />}
  >
    Main content
  </AdminLayout>
);

const Logo = () => {
  const { sidebarState } = useContext(AdminLayoutContext);

  return (
    <h1 style={{ color: sidebarState === SidebarState.CLOSED_DRAWER ? 'black' : 'white' }}>Logo</h1>
  );
};

const SidebarContent = () => (
  <SidebarMenu>
    <Item key="1" icon={<HomeOutlined />}>
      Menu item 1
    </Item>
  </SidebarMenu>
);
```

## API

### `AdminLayout` props

| name                    | type                                  | default | description                                   |
| ----------------------- | ------------------------------------- | ------- | --------------------------------------------- |
| `logo`                  | ReactNode                             |         | custom logo                                   |
| `children`              | ReactNode                             |         | main content                                  |
| `headerContent`         | ReactNode                             |         | header content eg. search & user dropdown     |
| `sidebarContent`        | ReactNode                             |         | sidebar content eg. `SidebarMenu`             |
| `sidebarBreakpoint`     | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' | 'lg'    | breakpoint to use `Drawer` instead of `Sider` |
| `sidebarCollapsedWidth` | number \| string                      | 80      | width of the collapsed sidebar                |
| `sidebarWidth`          | number \| string                      | 256     | width of the sidebar                          |
| `sidebarTheme`          | 'light' \| 'dark'                     | 'dark'  | color theme of the sidebar                    |

### `SidebarMenu`

SidebarMenu is a simple wrapper over [Ant's Menu](https://ant.design/components/menu/) with the same API with these differences:

- `mode` is set to `inline`
- `theme` defaults to the value of `sidebarTheme`
- `Menu.Item`'s `onClick` closes drawer on mobile

### `AdminLayoutContext`

AdminLayoutContext stores the current state of the `AdminLayout`. These values are provided:

| name              | type              | description                                                                                                                        |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `isCollapsed`     | boolean           | indicates whether sidebar is collapsed                                                                                             |
| `isDrawerVisible` | boolean           | indicates whether `Drawer` is visibile                                                                                             |
| `useDrawer`       | boolean           | indicates whether `Drawer` is used instead of `Sider`                                                                              |
| `sidebarState`    | Enum              | based on previous 3 values, indicates one of 4 states of sidebar (`openSidebar`, `collapsedSidebar`, `openDrawer`, `closedDrawer`) |
| `sidebarTheme`    | 'light' \| 'dark' | color theme of the sidebar                                                                                                         |
| `toggle`          | VoidFunction      | toggle sidebar from outside                                                                                                        |
