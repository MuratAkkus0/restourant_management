import { HeaderMenuListProps } from '@/types/models/organisms/HeaderModels';
import MenuItem from './HeaderMenuItem';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import menuItems from '@/assets/static_datas/header_menu_tabs.json';

const HeaderMenuList: React.FC<HeaderMenuListProps> = ({ isMenuOpen }) => {
  const { status } = useSelector((store: RootState) => store.auth);
  const isAuthenticated = status === 'authenticated';

  return (
    <>
      <menu
        className={`w-full lg:w-fit lg:flex lg:gap-2 lg:justify-center h-fit bg-primary transition-[max-height] duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 lg:max-h-96' : 'max-h-0 lg:max-h-96'}`}
      >
        {menuItems.map((item, key) => {
          if ((item.menuName === 'Login' || item.menuName === 'Register') && isAuthenticated) {
            return null;
          }
          if (item.menuName === 'Dashboard') {
            if (!isAuthenticated) return null;
            return <MenuItem key={key} menuName={item.menuName} redirectTo="/admin" />;
          }

          return <MenuItem key={key} menuName={item.menuName} redirectTo={item.redirectTo} />;
        })}
      </menu>
    </>
  );
};

export default HeaderMenuList;
