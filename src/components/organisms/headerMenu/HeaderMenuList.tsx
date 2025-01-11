import { HeaderMenuListProps } from '@/types/models/organisms/HeaderModels';
import MenuItem from './HeaderMenuItem';

const HeaderMenuList: React.FC<HeaderMenuListProps> = ({ isMenuOpen }) => {
  const menuItems = [
    {
      menuName: 'Home',
      redirectTo: '/',
    },
    {
      menuName: 'Login',
      redirectTo: '/login',
    },
    {
      menuName: 'Register',
      redirectTo: '/register',
    },
    {
      menuName: 'About Us',
      redirectTo: '/about-us',
    },
  ];
  return (
    <>
      <menu
        className={`w-full lg:w-fit lg:flex lg:gap-2 lg:justify-center h-fit bg-primary transition-[max-height] duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 lg:max-h-96' : 'max-h-0 lg:max-h-96'}`}
      >
        {menuItems.map((item, key) => (
          <MenuItem
            key={key}
            menuName={item.menuName}
            redirectTo={item.redirectTo}
          />
        ))}
      </menu>
    </>
  );
};

export default HeaderMenuList;
