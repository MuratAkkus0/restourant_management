import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import UserCircleCardWithName from '../../UserCircleCardWithName';
import MenuList from './MenuList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function DashMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const userData = useSelector(
    (store: RootState) => store.onAuthChangeState.user
  );

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="z-[2] md:hidden absolute w-full h-full top-0 left-0 bg-[#00000031]"
        ></div>
      )}
      <aside
        className={`${
          isMenuOpen
            ? 'w-9/12 sm:w-4/12 md:w-4/12 lg:w-3/12 xl:w-3/12 translate-x-0'
            : 'w-0 -translate-x-full'
        } z-10 h-full transition-[width transform] duration-200 absolute md:relative top-0 left-0 bg-slate-950 py-4 text-white`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-5 h-12 bg-slate-950 cursor-pointer absolute top-12 left-full flex justify-center items-center rounded-e-lg"
        >
          {isMenuOpen ? (
            <IoIosArrowBack className="text-base" />
          ) : (
            <IoIosArrowForward className="text-base" />
          )}
        </button>

        <div className="h-full overflow-y-auto flex-shrink-0 flex flex-col gap-8 items-center">
          <UserCircleCardWithName
            fullName={userData.displayName ?? ''}
            imgUrl={userData.photoURL ?? ''}
          />
          <MenuList />
        </div>
      </aside>
    </>
  );
}

export default DashMenu;

// import * as Icons from 'react-icons/md';
// import { IoIosArrowUp } from 'react-icons/io';
// import { IoIosArrowBack } from 'react-icons/io';
// import { IoIosArrowForward } from 'react-icons/io';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import menuTabs from '@/assets/static_datas/dash_menu_tabs.json';
// import UserCircleCardWithName from '../UserCircleCardWithName';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';

// function DashMenu() {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);

//   const userData = useSelector(
//     (store: RootState) => store.onAuthChangeState.user
//   );

//   type MenuItem = {
//     label: string;
//     route: string;
//     icon: keyof typeof Icons;
//     subMenu?: MenuItem[];
//   };

//   return (
//     <>
//       {isMenuOpen ? (
//         <div
//           onClick={() => setIsMenuOpen(false)}
//           className="z-[2] md:hidden absolute w-full h-full top-0 left-0 bg-[#00000031]"
//         ></div>
//       ) : (
//         ''
//       )}
//       <div
//         className={
//           (isMenuOpen
//             ? 'w-9/12 sm:w-4/12 md:w-4/12 lg:w-3/12 xl:w-3/12 translate-x-0'
//             : 'w-0 -translate-x-full') +
//           ' z-10 h-full transition-[width transform] duration-200 absolute md:relative top-0 left-0 bg-slate-950 py-4 text-white'
//         }
//       >
//         <div
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="w-5 h-12 bg-slate-950 cursor-pointer absolute top-12 left-full flex justify-center items-center rounded-e-lg"
//         >
//           {isMenuOpen ? (
//             <IoIosArrowBack className="text-base" />
//           ) : (
//             <IoIosArrowForward className="text-base" />
//           )}
//         </div>
//         <div
//           style={{ scrollbarColor: '#ffffffe3 rgb(2,6,23)' }}
//           className="h-full overflow-y-auto flex-shrink-0 flex flex-col gap-8 items-center overflow-hidden"
//         >
//           {/* User Cart */}
//           <UserCircleCardWithName
//             fullName={userData.displayName ?? ''}
//             imgUrl={userData.photoURL ?? ''}
//           />
//           {/* Dashboard Menu */}
//           <div className="w-full">
//             <p className="mb-1 text-gray-400 px-4 text-sm sm:text-base">
//               Dash menu
//             </p>
//             <menu>
//               {(menuTabs as MenuItem[]).map((tab, index) => {
//                 const IconComponent = Icons[tab.icon];
//                 return (
//                   <li
//                     key={index}
//                     className=" text-sm sm:text-base cursor-pointer hover:bg-slate-800 text-gray-400 "
//                   >
//                     <div className="flex gap-2 justify-between pr-4">
//                       <NavLink
//                         className={({ isActive }) =>
//                           `p-2 flex items-center justify-start gap-3 text-sm sm:text-base cursor-pointer hover:bg-slate-800  px-4 ${
//                             isActive
//                               ? 'bg-slate-800 text-white'
//                               : 'text-gray-400'
//                           }`
//                         }
//                         to={tab.route}
//                       >
//                         <IconComponent />
//                         <span className="font-Poppins font-light tracking-wider">
//                           {tab.label}
//                         </span>
//                       </NavLink>
//                       {tab.subMenu && (
//                         <div>
//                           <IoIosArrowUp />
//                         </div>
//                       )}
//                     </div>
//                     {tab.subMenu &&
//                       tab.subMenu.map((item, key) => {
//                         const SubIconComponent = Icons[item.icon];
//                         return (
//                           <ul className="min-w-full pl-5" key={key}>
//                             <li
//                               key={key}
//                               className=" text-sm sm:text-base cursor-pointer hover:bg-slate-800 text-gray-400 "
//                             >
//                               <NavLink
//                                 className={({ isActive }) =>
//                                   `p-2 flex items-center justify-start gap-3 text-sm sm:text-base cursor-pointer hover:bg-slate-800  px-4 ${
//                                     isActive
//                                       ? 'bg-slate-800 text-white'
//                                       : 'text-gray-400'
//                                   }`
//                                 }
//                                 to={item.route}
//                               >
//                                 {SubIconComponent && (
//                                   <SubIconComponent size="1.1rem" />
//                                 )}
//                                 <span className="font-Poppins font-light tracking-wider">
//                                   {item.label}
//                                 </span>
//                               </NavLink>
//                             </li>
//                           </ul>
//                         );
//                       })}
//                   </li>
//                 );
//               })}
//             </menu>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default DashMenu;
