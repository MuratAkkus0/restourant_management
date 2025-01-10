import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
import MenuItemComponent from './MenuItem';
import { MenuItem } from '@/types/models/AdminDashMenuModels';
import Pharagrapf from '@/components/atoms/Pharagrapf';

const MenuList = () => {
  const menuData = menuTabs as MenuItem[];

  return (
    <nav
      className="w-full h-full flex-[1] overflow-y-auto"
      style={{ scrollbarColor: '#ffffffe3 rgb(2,6,23)' }}
    >
      <Pharagrapf
        size="sm"
        colorClassName="text-gray-400"
        className=" px-4 sm:text-base"
      >
        Dash menu
      </Pharagrapf>
      <ul>
        {menuData.map((tab, index) => (
          <MenuItemComponent key={index} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
