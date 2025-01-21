export type DashMenuItemProps = {
  tab: DashMenuItemType;
  index: number;
  activeIndex: number | null;
  handleMenuOpen: CallableFunction;
};
export type DashMenuItemType = {
  label: string;
  route: string;
  icon: string;
  isInDevProccess?: boolean;
  subMenu?: DashMenuItemType[];
};
