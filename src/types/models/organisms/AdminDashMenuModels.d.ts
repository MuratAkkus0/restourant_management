export type DashMenuItemProps = {
  tab: DashMenuItemType;
};
export type DashMenuItemType = {
  label: string;
  route: string;
  icon: string;
  subMenu?: DashMenuItemType[];
};
