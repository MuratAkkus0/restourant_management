import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
import Pharagrapf from '@/components/atoms/Pharagrapf';
import DashMenuItem from './DashMenuItem';
import { DashMenuItemType } from '@/types/models/organisms/AdminDashMenuModels';
import { useState } from 'react';

const DashMenuList = () => {
  const menuData = menuTabs as DashMenuItemType[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMenuOpen = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <nav
      className="w-full h-full flex-[1] overflow-y-auto"
      style={{ scrollbarColor: '#ffffffe3 rgb(2,6,23)' }}
    >
      <Pharagrapf
        size="2xs"
        colorClassName="text-gray-400"
        className=" px-4 sm:text-sm"
      >
        Dash menu
      </Pharagrapf>
      <ul>
        {menuData.map((tab, index) => {
          if (tab.isInDevProccess) return;
          return (
            <DashMenuItem
              key={index}
              tab={tab}
              index={index}
              activeIndex={activeIndex}
              handleMenuOpen={handleMenuOpen}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default DashMenuList;
