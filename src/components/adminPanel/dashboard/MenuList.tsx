import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
import MenuItemComponent from './MenuItem';
import { MenuItem } from '@/types/models/AdminDashMenuModels';

const MenuList = () => {
  const menuData = menuTabs as MenuItem[];

  return (
    <nav
      className="w-full h-full flex-[1] overflow-y-auto"
      style={{ scrollbarColor: '#ffffffe3 rgb(2,6,23)' }}
    >
      <p className="text-gray-400 px-4 text-sm sm:text-base">Dash menu</p>
      <ul>
        {menuData.map((tab, index) => (
          <MenuItemComponent key={index} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
