export type MenuItemProps = {
  tab: MenuItem;
};
export type MenuItem = {
  label: string;
  route: string;
  icon: string;
  subMenu?: MenuItem[];
};
