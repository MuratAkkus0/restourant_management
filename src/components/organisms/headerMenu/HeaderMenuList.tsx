import { HeaderMenuListProps } from '@/types/models/organisms/HeaderModels';
import MenuItem from './HeaderMenuItem';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { AppUserRoles } from '@/types/enums/AuthEnums';
import menuItems from '@/assets/static_datas/header_menu_tabs.json';

const HeaderMenuList: React.FC<HeaderMenuListProps> = ({ isMenuOpen }) => {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);

  return (
    <>
      <menu
        className={`w-full lg:w-fit lg:flex lg:gap-2 lg:justify-center h-fit bg-primary transition-[max-height] duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 lg:max-h-96' : 'max-h-0 lg:max-h-96'}`}
      >
        {menuItems.map((item, key) => {
          if (
            (item.menuName === 'Login' || item.menuName === 'Register') &&
            userData.role !== AppUserRoles.unknown
          ) {
            return;
          }
          if (
            item.menuName === 'Dashboard' &&
            userData.role === AppUserRoles.unknown
          ) {
            return;
          }
          if (
            item.menuName === 'Dashboard' &&
            userData.role === AppUserRoles.admin
          ) {
            return (
              <MenuItem
                key={key}
                menuName={item.menuName}
                redirectTo={'/admin'}
              />
            );
          }
          if (
            item.menuName === 'Dashboard' &&
            userData.role === AppUserRoles.personal
          ) {
            return (
              <MenuItem
                key={key}
                menuName={item.menuName}
                redirectTo={'/personal'}
              />
            );
          }

          if (
            item.menuName === 'Dashboard' &&
            userData.role === AppUserRoles.customer
          ) {
            return (
              <MenuItem
                key={key}
                menuName={item.menuName}
                redirectTo={'/customer'}
              />
            );
          }

          return (
            <MenuItem
              key={key}
              menuName={item.menuName}
              redirectTo={item.redirectTo}
            />
          );
        })}
      </menu>
    </>
  );
};

export default HeaderMenuList;
