import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';
import { FontSizes, LogoSizes } from '../types/models/LogoModels';
import { IoMenu } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setIsMenuOpen } from '../store/slices/appConfigSlice';
import { useLogout } from '@/customHooks/useGoogleAuth';
function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(
    (store: RootState) => store.appConfigSlice.isMenuOpen
  );
  const logout = useLogout();

  return (
    <header className="w-full min-h-20 h-fit flex flex-wrap flex-shrink-0 items-center justify-between bg-primary relative border-b bg-white lg:px-16">
      <div className="h-20 flex flex-shrink-0 items-center justify-center ml-2 sm:ml-3 md:ml-4 lg:ml-0">
        <Logo
          FontSize={FontSizes.semiRegular}
          LogoSize={LogoSizes.semiRegular}
        />
      </div>
      <div className="lg:hidden h-20 flex flex-shrink-0 justify-center items-center mr-2 sm:mr-3 md:mr-4 lg:mr-0">
        <IoMenu
          onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
          size={40}
          className="hover:cursor-pointer hover:scale-105 "
        />
      </div>
      <menu
        className={`w-full lg:w-fit lg:flex lg:gap-2 lg:justify-center h-fit bg-primary transition-[max-height] duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 lg:max-h-96' : 'max-h-0 lg:max-h-96'}`}
      >
        <li>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `w-full lg:w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-y rounded border-y-neutralLight lg:border-t-0 hover:cursor-pointer hover:tracking-wider transition-all text-lg ${isActive ? 'text-red-600 border-b-red-600' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/login'}
            className={({ isActive }) =>
              `w-full lg:w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-b rounded border-gray-200 hover:cursor-pointer hover:tracking-wider transition-all text-lg ${isActive ? 'text-red-600 border-b-red-600' : ''}`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/register'}
            className={({ isActive }) =>
              `w-full lg:w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-b rounded border-gray-200 hover:cursor-pointer hover:tracking-wider transition-all text-lg ${isActive ? 'text-red-600 border-b-red-600' : ''}`
            }
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/about-us'}
            className={({ isActive }) =>
              `w-full lg:min-w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-b rounded border-gray-200 hover:cursor-pointer hover:tracking-wider transition-all text-lg ${isActive ? 'text-red-600 border-b-red-600' : ''}`
            }
          >
            About Us
          </NavLink>
        </li>
        <li
          onClick={logout}
          className={`w-full lg:min-w-24 h-full lg:h-fit flex items-center lg:justify-center p-2 lg:py-0 border-b rounded border-gray-200 hover:cursor-pointer hover:tracking-wider transition-all text-lg border-b-red-600`}
        >
          Logout
        </li>
      </menu>
    </header>
  );
}

export default Header;
