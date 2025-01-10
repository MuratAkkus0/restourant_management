import Logo from '../Logo';
import { FontSizes, LogoSizes } from '../../types/models/LogoModels';
import { IoMenu } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setIsMenuOpen } from '../../store/slices/appConfigSlice';
import MenuList from './MenuList';
function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(
    (store: RootState) => store.appConfigSlice.isMenuOpen
  );

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
      <MenuList isMenuOpen={isMenuOpen} />
    </header>
  );
}

export default Header;
