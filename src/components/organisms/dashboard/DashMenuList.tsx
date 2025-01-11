import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
import Pharagrapf from '@/components/atoms/Pharagrapf';
import DashMenuItem from './DashMenuItem';
import { DashMenuItemType } from '@/types/models/organisms/AdminDashMenuModels';

const DashMenuList = () => {
  const menuData = menuTabs as DashMenuItemType[];

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
          <DashMenuItem key={index} tab={tab} />
        ))}
      </ul>
    </nav>
  );
};

export default DashMenuList;
