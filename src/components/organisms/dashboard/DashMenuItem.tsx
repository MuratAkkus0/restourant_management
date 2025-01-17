import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { DashMenuItemProps } from '@/types/models/organisms/AdminDashMenuModels';

const DashMenuItem: React.FC<DashMenuItemProps> = ({ tab }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const IconComponent = Icons[tab.icon as keyof typeof Icons];
  console.log(tab.route);
  return (
    <>
      <li className="cursor-pointer text-sm md:text-base xl:text-md text-gray-400">
        <div onClick={() => tab.subMenu && setIsSubMenuOpen(!isSubMenuOpen)}>
          <NavLink
            to={
              tab.subMenu ? `${tab.route}/${tab.subMenu[0].route}` : tab.route
            }
            className={({ isActive }) =>
              `w-full h-full p-2 flex justify-between items-center gap-3 px-4 ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-400 hover:bg-slate-800'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {IconComponent && <IconComponent />}
              <span className="font-light tracking-wider">{tab.label}</span>
            </div>
            {tab.subMenu && (
              <button aria-expanded={isSubMenuOpen}>
                {isSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            )}
          </NavLink>
        </div>
      </li>

      {isSubMenuOpen && tab.subMenu && (
        <ul className="pl-5">
          {tab.subMenu.map((item, key) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            return (
              <li key={key} className="hover:bg-slate-800 text-sm md:text-base">
                <NavLink
                  to={`${tab.route}/${item.route}`}
                  className={({ isActive }) =>
                    `p-2 flex items-center gap-3 px-4 ${
                      isActive ? 'bg-slate-800 text-white' : 'text-gray-400'
                    }`
                  }
                >
                  {item.icon && Icons[item.icon as keyof typeof Icons] && (
                    <Icon size="1.1rem" />
                  )}
                  <span className="font-light tracking-wider">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DashMenuItem;
