import * as Icons from 'react-icons/md';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';

function DashMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  type MenuItem = {
    label: string;
    route: string;
    icon: keyof typeof Icons;
    subMenu?: MenuItem[];
  };

  return (
    <>
      {isMenuOpen ? (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="z-[2] md:hidden absolute w-full h-full top-0 left-0 bg-[#00000031]"
        ></div>
      ) : (
        ''
      )}
      <div
        className={
          (isMenuOpen
            ? 'w-9/12 sm:w-4/12 md:w-4/12 lg:w-3/12 xl:w-3/12 translate-x-0'
            : 'w-0 -translate-x-full') +
          ' z-10 h-full transition-[width transform] duration-200 absolute md:relative top-0 left-0 bg-slate-950 py-4 text-white'
        }
      >
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-4 h-12 bg-slate-950 cursor-pointer absolute top-12 left-full flex justify-center items-center rounded-e-lg"
        >
          {isMenuOpen ? (
            <IoIosArrowBack className="text-lg" />
          ) : (
            <IoIosArrowForward className="text-lg" />
          )}
        </div>
        <div className="flex flex-col gap-8 items-center overflow-hidden">
          {/* User Cart */}
          <div className="w-full h-1/12 flex items-center gap-2 px-4">
            <div className="h-full">
              <div className="w-12 h-12 flex justify-center items-center bg-green-400 text-xl font-Poppins font-semibold tracking-wider rounded-full">
                MA
              </div>
            </div>
            <div className="text-white text-base sm:text-base lg:text-lg xl:text-xl leading-5">
              <p className="font-Poppins font-normal">Murat Akkus</p>
              <p className="font-Poppins text-xs font-extralight text-gray-400">
                Welcome!
              </p>
            </div>
          </div>
          {/* Dashboard Menu */}
          <div className="w-full">
            <p className="mb-1 text-gray-400 px-4 text-sm sm:text-base">
              Dash menu
            </p>
            <menu>
              {(menuTabs as MenuItem[]).map((tab, index) => {
                // const IconComponent = ;
                return (
                  <li
                    key={index}
                    className=" text-sm sm:text-base cursor-pointer hover:bg-slate-800 text-gray-400 "
                  >
                    <div className="flex gap-2 justify-between pr-4">
                      <NavLink
                        className={({ isActive }) =>
                          `p-2 flex items-center justify-start gap-3 text-sm sm:text-base cursor-pointer hover:bg-slate-800  px-4 ${
                            isActive
                              ? 'bg-slate-800 text-white'
                              : 'text-gray-400'
                          }`
                        }
                        to={tab.route}
                      >
                        {Icons[tab.icon] as unknown as ReactNode}
                        <span className="font-Poppins font-light tracking-wider">
                          {tab.label}
                        </span>
                      </NavLink>
                      {tab.subMenu && (
                        <div>
                          <IoIosArrowUp />
                        </div>
                      )}
                    </div>
                    {tab.subMenu &&
                      tab.subMenu.map((item, key) => {
                        const SubIconComponent = Icons[item.icon];
                        return (
                          <ul className="min-w-full pl-5" key={key}>
                            <li
                              key={key}
                              className=" text-sm sm:text-base cursor-pointer hover:bg-slate-800 text-gray-400 "
                            >
                              <NavLink
                                className={({ isActive }) =>
                                  `p-2 flex items-center justify-start gap-3 text-sm sm:text-base cursor-pointer hover:bg-slate-800  px-4 ${
                                    isActive
                                      ? 'bg-slate-800 text-white'
                                      : 'text-gray-400'
                                  }`
                                }
                                to={item.route}
                              >
                                {SubIconComponent && (
                                  <SubIconComponent size="1.1rem" />
                                )}
                                <span className="font-Poppins font-light tracking-wider">
                                  {item.label}
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        );
                      })}
                  </li>
                );
              })}
            </menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashMenu;
