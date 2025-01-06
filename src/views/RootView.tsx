import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMenuOpen } from '../store/slices/appConfigSlice';
import { RootState } from '../store/store';

function RootView() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(
    (store: RootState) => store.appConfigSlice.isMenuOpen
  );
  const checkMenuStatus = () => {
    if (isMenuOpen) {
      dispatch(setIsMenuOpen(false));
    } else return;
  };
  return (
    <div className="min-h-svh flex flex-col gap-2 items-center md:container md:mx-auto">
      <Header />
      <div onClick={checkMenuStatus} className="flex-1 flex w-full min-h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default RootView;
