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
