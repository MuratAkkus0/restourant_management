import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import UserCircleCardWithName from '../../molecules/UserCircleCardWithName';
import MenuList from './MenuList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TbLogout2 } from 'react-icons/tb';
import { useLogout } from '@/customHooks/useLogout';

function DashMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const userData = useSelector(
    (store: RootState) => store.onAuthChangeState.user
  );
  const logout = useLogout();

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="z-[2] md:hidden absolute w-full h-full top-0 left-0 bg-[#00000031]"
        ></div>
      )}
      <aside
        className={`${isMenuOpen
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

        <div className="h-full overflow-y-auto flex-shrink-0 flex flex-col justify-between gap-2 items-center">
          <UserCircleCardWithName
            fullName={userData.displayName ?? ''}
            imgUrl={userData.photoURL ?? ''}
          />
          <MenuList />
          <div
            onClick={() => logout()}
            className="w-full flex justify-end items-center gap-1 text-md px-4 cursor-pointer"
          >
            <span className="flex items-center gap-1 cursor-pointer text-base md:text-xl">
              <TbLogout2 className="text-xl md:text-2xl" />
              Logout
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashMenu;
