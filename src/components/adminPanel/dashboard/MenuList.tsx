import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
import { MenuItem } from '@/types/models/MenuItem';
import MenuItemComponent from './MenuItem';

const MenuList = () => {
  const menuData = menuTabs as MenuItem[];

  return (
    <nav className="w-full">
      <p className="mb-1 text-gray-400 px-4 text-sm sm:text-base">Dash menu</p>
      <ul>
        {menuData.map((tab, index) => (
          <MenuItemComponent key={index} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
