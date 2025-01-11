import { HeaderMenuItemProps } from '@/types/models/organisms/HeaderModels';
import { NavLink } from 'react-router-dom';

const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({
  menuName,
  redirectTo,
}) => {
  return (
    <li>
      <NavLink
        to={redirectTo}
        className={({ isActive }) =>
          `w-full lg:w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-b rounded border-gray-200 hover:cursor-pointer hover:tracking-wider transition-all text-lg ${isActive ? 'text-red-600 border-b-red-600' : ''}`
        }
      >
        {menuName}
      </NavLink>
    </li>
  );
};

export default HeaderMenuItem;
